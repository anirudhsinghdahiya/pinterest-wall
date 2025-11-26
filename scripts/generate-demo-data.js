const fs = require('fs');
const path = require('path');

// Sample Pinterest-style image URLs from Unsplash (free to use)
// These are categorized to match the board themes
const SAMPLE_IMAGES = {
    'fantasy-art': [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800',
        'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800',
        'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800',
        'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800',
        'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
        'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    ],
    'millitary': [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
        'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800',
        'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800',
        'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
        'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800',
        'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
        'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800',
        'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
        'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800',
        'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
        'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800',
        'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800',
    ],
    'apollo': [
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
        'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800',
        'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800',
        'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
        'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800',
        'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
        'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800',
        'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
        'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800',
        'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
    ],
    'animals-vibe': [
        'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800',
        'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800',
        'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800',
        'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800',
        'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800',
        'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800',
        'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800',
        'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800',
        'https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=800',
        'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?w=800',
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800',
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800',
        'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800',
        'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800',
        'https://images.unsplash.com/photo-1573865526739-10c1dd7e4c9c?w=800',
        'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800',
        'https://images.unsplash.com/photo-1570458436416-b8fcccfe883c?w=800',
        'https://images.unsplash.com/photo-1591768575558-c3e6f8e5b86d?w=800',
        'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?w=800',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
        'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=800',
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
    ],
    'spiritual-art': [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800',
        'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800',
        'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800',
        'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
        'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800',
        'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
        'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    ],
};

function generateDemoData() {
    console.log('🎨 Generating demo data for Pinterest Wall...\n');

    const allImages = [];
    const MIN_IMAGES = 20;
    const MAX_IMAGES = 30;

    // For each board, randomly select images
    Object.entries(SAMPLE_IMAGES).forEach(([boardName, images]) => {
        const count = Math.floor(Math.random() * (MAX_IMAGES - MIN_IMAGES + 1)) + MIN_IMAGES;
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(count, images.length));

        selected.forEach(url => {
            allImages.push({
                url,
                board: boardName,
            });
        });

        console.log(`  ${boardName}: ${selected.length} images`);
    });

    // Shuffle all images
    const shuffledAll = allImages.sort(() => 0.5 - Math.random());

    // Save to JSON
    const outputPath = path.join(__dirname, '..', 'public', 'pins.json');
    const data = {
        images: shuffledAll,
        scrapedAt: new Date().toISOString(),
        totalImages: shuffledAll.length,
        note: 'Demo data using Unsplash images',
    };

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log(`\n✅ Demo data generated!`);
    console.log(`📊 Total images: ${shuffledAll.length}`);
    console.log(`💾 Saved to: ${outputPath}`);
    console.log(`\n🌐 Open http://localhost:3000 to see your animated wall!`);
}

generateDemoData();
