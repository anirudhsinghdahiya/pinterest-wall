const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Pinterest board URLs to scrape
const BOARD_URLS = [
    'https://www.pinterest.com/aryan_nomad/fantasy-art/',
    'https://www.pinterest.com/aryan_nomad/millitary/',
    'https://www.pinterest.com/aryan_nomad/apollo/',
    'https://www.pinterest.com/aryan_nomad/animals-vibe/',
    'https://www.pinterest.com/aryan_nomad/spiritual-art/',
];

// Number of images to extract per board (random 20-30)
const MIN_IMAGES_PER_BOARD = 20;
const MAX_IMAGES_PER_BOARD = 30;

// Delay for scrolling and loading
const SCROLL_DELAY = 3000;
const MAX_SCROLLS = 8;

async function scrapeBoard(browser, boardUrl) {
    console.log(`\nScraping board: ${boardUrl}`);

    // Create a new page for each board to avoid frame detachment issues
    const page = await browser.newPage();

    try {
        // Set a realistic user agent
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        );

        // Set viewport
        await page.setViewport({ width: 1920, height: 1080 });

        console.log('  Navigating to board...');
        await page.goto(boardUrl, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Wait a bit for initial content to load
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Wait for images to load
        try {
            await page.waitForSelector('img', { timeout: 10000 });
        } catch (e) {
            console.log('  Warning: Could not find images initially, continuing anyway...');
        }

        // Scroll down to load more images
        console.log('  Scrolling to load images...');
        for (let i = 0; i < MAX_SCROLLS; i++) {
            try {
                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
                await new Promise(resolve => setTimeout(resolve, SCROLL_DELAY));
                console.log(`    Scroll ${i + 1}/${MAX_SCROLLS}`);
            } catch (e) {
                console.log(`    Error during scroll ${i + 1}, continuing...`);
            }
        }

        // Extract image URLs
        console.log('  Extracting image URLs...');
        const imageUrls = await page.evaluate(() => {
            const images = [];
            const imgElements = document.querySelectorAll('img');

            imgElements.forEach(img => {
                const src = img.src || img.getAttribute('src');
                // Filter for Pinterest CDN images (high quality)
                if (src && src.includes('pinimg.com') && !src.includes('avatar') && !src.includes('user')) {
                    // Get the original/larger version of the image
                    let cleanUrl = src.split('?')[0]; // Remove query params

                    // Try to get higher quality version
                    if (cleanUrl.includes('/236x/')) {
                        cleanUrl = cleanUrl.replace('/236x/', '/originals/');
                    } else if (cleanUrl.includes('/474x/')) {
                        cleanUrl = cleanUrl.replace('/474x/', '/originals/');
                    } else if (cleanUrl.includes('/564x/')) {
                        cleanUrl = cleanUrl.replace('/564x/', '/originals/');
                    }

                    if (!images.includes(cleanUrl)) {
                        images.push(cleanUrl);
                    }
                }
            });

            return images;
        });

        console.log(`  Found ${imageUrls.length} images`);

        // Randomly select images
        const targetCount = Math.floor(
            Math.random() * (MAX_IMAGES_PER_BOARD - MIN_IMAGES_PER_BOARD + 1) + MIN_IMAGES_PER_BOARD
        );
        const selectedImages = [];
        const shuffled = imageUrls.sort(() => 0.5 - Math.random());
        const count = Math.min(targetCount, shuffled.length);

        for (let i = 0; i < count; i++) {
            selectedImages.push(shuffled[i]);
        }

        console.log(`  ✓ Selected ${selectedImages.length} random images`);

        // Extract board name from URL
        const boardName = boardUrl.split('/').filter(Boolean).pop().replace('/', '');

        await page.close();

        return selectedImages.map(url => ({
            url,
            board: boardName,
        }));

    } catch (error) {
        console.error(`  ✗ Error scraping ${boardUrl}:`, error.message);
        await page.close();
        return [];
    }
}

async function main() {
    console.log('🎨 Pinterest Board Scraper Starting...\n');
    console.log('This may take several minutes...\n');

    const browser = await puppeteer.launch({
        headless: false, // Set to false to see the browser (helps with debugging)
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
        ],
    });

    const allImages = [];

    // Scrape each board
    for (const boardUrl of BOARD_URLS) {
        const images = await scrapeBoard(browser, boardUrl);
        allImages.push(...images);

        // Small delay between boards
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    await browser.close();

    // Save to JSON file
    const outputPath = path.join(__dirname, '..', 'public', 'pins.json');
    const data = {
        images: allImages,
        scrapedAt: new Date().toISOString(),
        totalImages: allImages.length,
    };

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log('\n✅ Scraping complete!');
    console.log(`📊 Total images collected: ${allImages.length}`);
    console.log(`💾 Saved to: ${outputPath}`);

    if (allImages.length > 0) {
        console.log('\nBreakdown by board:');

        const boardCounts = {};
        allImages.forEach(img => {
            boardCounts[img.board] = (boardCounts[img.board] || 0) + 1;
        });

        Object.entries(boardCounts).forEach(([board, count]) => {
            console.log(`  ${board}: ${count} images`);
        });
    } else {
        console.log('\n⚠️  No images were collected. This might be due to:');
        console.log('  - Pinterest requiring login');
        console.log('  - Rate limiting or bot detection');
        console.log('  - Network issues');
        console.log('\nTry running the scraper again, or check if the boards are accessible.');
    }
}

main().catch(console.error);
