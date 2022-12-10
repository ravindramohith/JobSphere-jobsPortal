import React from 'react'
import { BiRupee } from 'react-icons/bi';
import { useRouter } from 'next/router';

const Filters = () => {
    const router = useRouter()
    let queryParams;
    if (typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search)
    }
    //for filtering
    function handleClick(checkBox) {

        if (typeof window !== 'undefined') {
            const checkBoxes = document.getElementsByName(checkBox.name)
        }
        checkBoxes.forEach(element => {
            if (element !== checkBox) {
                element.checked = false
            }
        });

        if (checkBox.checked === false) {
            if (queryParams.has(checkBox.name)) {
                queryParams.delete(checkBox.name)
                router.replace({
                    search: queryParams.toString(),
                })
            }
        } else {
            if (queryParams.has(checkBox.name)) {
                queryParams.set(checkBox.name, checkBox.value)
            } else {
                queryParams.append(checkBox.name, checkBox.value)
            }
            router.replace({
                search: queryParams.toString(),
            })
        }
    }

    //for resisting checkboxes values even after refreshing.
    function check(checkBoxType, checkBoxValue) {
        if (typeof window !== 'undefined') {
            const value = queryParams.get(checkBoxType);
            if (checkBoxValue === value) return true
            return false
        }
    }
    return (
        <div className="sidebar mt-5">
            <h3>Filters</h3>

            <hr />
            <h5 className="filter-heading mb-3">Job Type</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobType"
                    id="check1"
                    value="Permanent"

                    defaultChecked={check('jobType', 'Permanent')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check1">
                    Permanent
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobType"
                    id="check2"
                    value="Temporary"
                    defaultChecked={check('jobType', 'Temporary')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check2">
                    Temporary
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobType"
                    id="check3"
                    value="Internship"
                    defaultChecked={check('jobType', 'Internship')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check3">
                    Internship
                </label>
            </div>

            <hr />
            <h5 className="mb-3">Education</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="education"
                    id="check4"
                    value="Bachelors"
                    defaultChecked={check('education', 'Bachelors')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check4">
                    Bachelors
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="education"
                    id="check5"
                    value="Masters"
                    defaultChecked={check('education', 'Masters')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check5">
                    Masters
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="education"
                    id="check6"
                    value="Phd"
                    defaultChecked={check('education', 'Phd')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check6">
                    Phd
                </label>
            </div>

            <hr />

            <h5 className="mb-3">Experience</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="experience"
                    id="check7"
                    value="No Experience"
                    defaultChecked={check('experience', 'No Experience')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check7">
                    No Experience
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="experience"
                    id="check8"
                    value="1 Year"
                    defaultChecked={check('experience', '1 Year')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check8">
                    1 Year
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="experience"
                    id="check9"
                    value="2 Years"
                    defaultChecked={check('experience', '2 Years')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check9">
                    2 Years
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="experience"
                    id="check10"
                    value="3 years plus"
                    defaultChecked={check('experience', '3 years plus')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check10">
                    3 Years+
                </label>
            </div>

            <hr />
            <h5 className="mb-3">Salary Range</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="check11"
                    value="1-50000"
                    defaultChecked={check('salary', '1-50000')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check11">
                    <BiRupee />1 - <BiRupee />50000
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="check12"
                    value="50000-100000"
                    defaultChecked={check('salary', '50000-100000')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check12">
                    <BiRupee />50000 - <BiRupee />100,000
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="check13"
                    value="100000-200000"
                    defaultChecked={check('salary', '100000-200000')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check13">
                    <BiRupee />100,000 - <BiRupee />200,000
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="defaultCheck2"
                    value="300000-500000"
                    defaultChecked={check('salary', '300000-500000')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="defaultCheck2">
                    <BiRupee />300,000 - <BiRupee />500,000
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="check14"
                    value="500000-1000000"
                    defaultChecked={check('salary', '500000-1000000')}
                    onClick={e => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check14">
                    <BiRupee />500,000 - <BiRupee />1,000,000
                </label>
            </div>

            <hr />
        </div>)
}

export default Filters