let responseObj;

exports.getBirthdays = async function (req, res) {
    try {
        res.status("200").send("employeeList")
    }
    catch (err) {
        console.log("error...", err)
        res.status("500").send(err)
    }
}
