const {Employee} = require('../Model/employeeModel');

// Pagination
// Filter Departments
// Sort by Salary
// Search by Fname

class EmpFeatures {
    constructor(Query, reqQuery) {
        this.Query = Query;
        this.reqQuery = reqQuery;
    }

    // Filter

    filter() {
        let reqQueryObj = {...this.reqQuery};

        ['page', 'sort', 'limit', 'fields'].forEach(function (item) {
            delete reqQueryObj[item];
        });

        this.Query = this.Query.find(reqQueryObj);
        return this;
    }

    sort() {
        if (this.reqQuery.sort) {
            const sortBy = this.reqQuery.sort.split(',').join(' ');
            this.Query = this.Query.sort(sortBy);
        }
        return this;
    }

    paginate() {
        const page = this.reqQuery.page * 1 || 1;
        const limit = this.reqQuery.limit * 1 || 5;
        const skip = (page - 1) * limit;

        this.Query = this.Query.skip(skip).limit(limit);
        return this;
    }
}

const getAllEmp = async function (req, res) {
    try {
        let emps = new EmpFeatures(Employee.find(), req.query);
        emps = emps.filter().sort().paginate();

        const docs = await emps.Query;

        return res.status(200).json({
            status: 'Success',
            results: docs.length,
            data: {data: docs},
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const addEmp = async function (req, res) {
    try {
        const newEmp = await Employee.create(req.body);
        return res.status(201).json({
            status: 'Success',
            data: {data: newEmp},
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const updateEmp = async function (req, res) {
    try {
        const id = req.params.id;
        const updatedEmp = await Employee.findByIdAndUpdate(id, req.body);
        return res.status(200).json({
            status: 'Success',
            data: {data: updatedEmp},
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const deleteEmp = async function (req, res) {
    try {
        const id = req.params.id;
        await Employee.findByIdAndDelete(id);
        return res.status(204).json({
            status: 'Success',
            message: 'Employee Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {getAllEmp, addEmp, updateEmp, deleteEmp};
