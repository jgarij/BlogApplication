const express = require('express')
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("garimaa")
})

router.get("/:id", async (req, res) => {
   
    try {
        const { id } = req.params;
        res.json({ id }); 
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Server error" }); // ✅ Handle errors properly
    }
});

module.exports = router