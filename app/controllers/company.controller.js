const db = require("../models");
const Company = db.company;
const Employee = db.employee;

//ค้นหาข้อมูลทั้งหมดใน company
exports.findAllCompany = (req, res) => {
    try {
        Company.findAll({
            include: [          //join table
                {
                    model: Employee,
                    attributes: ["name", "position"]
                }
            ]
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } catch (error) {
        console.log(error);
    }
};

exports.createCompany = (req, res) => {
    try {
        if (!req.body.name || !req.body.position) {
            res.status(400).json({
                message: "Content cannot be empty!"
            });
            return;
        }
        const newCompany = {
            name: req.body.name,
            position: req.body.position
        };

        Company.create(newCompany)
            .then(data => {
                Setting.create({
                    theme: req.body.theme,
                    companyId: data.id
                });

                res.status(200).json({ message: "Company created." });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });

    } catch (error) {
        console.log(error);
    }
};