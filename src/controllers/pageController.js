
exports.getFrontPage = (req, res) => {
    res.render('index', {})
};

exports.getDash = (req, res) => {
    if (true) {
        return res.status(200).render('dashboard', {})
    } else {
        res.status(404).render('404', {})
    }
}; 