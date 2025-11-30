// No, this is not entirely correct. 

// To clarify:
// 1. The destructuring in `const { url } = req.body["url"];` is invalid. You likely want either `const { url } = req.body;`
//    or simply `const url = req.body.url`, assuming the POST body is `{ "url": "..." }`, not `{ "url": { "url": ... } }`.
//
// 2. There is no function defined as `downloadWithPlatform`, so the check `if (typeof downloadWithPlatform === 'function') ...` 
//    will always fall to the `alldown(url)` default, which may not provide platform-specific control. 
//
// 3. The alias `lk: "likee:"` has a colon, which is probably unintentional and should likely be `"likee"`.
//
// 4. If you want to map a platform string to the correct downloader, you'd need to call the correct function (e.g. `ytdown(url)`).
//
// 5. Here's a corrected version:

const express = require("express");
const {
    ndown,
    tikdown,
    ytdown,
    twitterdown,
    GDLink,
    pintarest,
    capcut,
    likee,
    threads,
    spotifySearch,
    spotifyDl,
    soundcloudSearch,
    soundcloud,
    terabox,
    alldown
} = require("cyber-media-downloader");

const app = express();
app.use(express.json());

const downloaderMap = {
    tt: tikdown,
    tikdown,
    yt: ytdown,
    ytdown,
    twt: twitterdown,
    twitter: twitterdown,
    twitterdown,
    gdrive: GDLink,
    GDLink,
    fb: ndown,
    ig: ndown,
    ndown,
    pt: pintarest,
    pintarest,
    cp: capcut,
    capcut,
    lk: likee,
    likee,
    th: threads,
    threads,
    sp: spotifyDl,
    spotifyDl,
    sc: soundcloud,
    soundcloud,
    tb: terabox,
    terabox
};

app.post("/api/download/:platform", async (req, res) => {
    const { platform } = req.params;
    const url = req.body.url; // corrected

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    // Use downloader map to call correct function, fallback to alldown if unknown
    const key = platform.toLowerCase();
    const downloader = downloaderMap[key] || alldown;

    try {
        const result = await downloader(url);
        const data = {status : true, data :{}, msg : ""}
        if (result.status) {
            // Cek apakah result.data ada, jika tidak, cek result.media, jika tidak juga ada fallback ke array kosong (atau bisa null/{} sesuai kebutuhan)
            if (typeof result.data !== 'undefined' && result.data !== null) {
                data.data = result.data;
            } else if (typeof result.media !== 'undefined' && result.media !== null) {
                data.data = result.media;
            } else {
                data.status = false
                data.msg = "data empty but return true on api server"
            }
        } else {
            data.status = false
            data.msg = result?.error || result?.msg || result?.message || "Unknown error"
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            msg: String(err)
        });
    }
});

const PORT = 41101;
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});

