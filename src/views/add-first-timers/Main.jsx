import { useState } from "react";
import {
    Lucide,
    PreviewComponent,
    Preview,
    LoadingIcon,
    Source,
    TomSelect,
    Highlight,
} from "@/base-components";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import dom from "@left4code/tw-starter/dist/js/dom";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { db } from "../../firebase";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Main() {
    const [apiError, setapiError] = useState('Error');
    const [loading, setLoading] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const dispatch = useDispatch();


    const [ageRange, setAgeRange] = useState("");
    const [badComment, setBadComment] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [dateOfVisit, setDateOfVisit] = useState("");
    const [eduLevel, setEduLevel] = useState("");
    const [feedback, setFeedback] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [fullname, setFullname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [prayerRequest, setPrayerRequest] = useState("");
    const [zone, setZone] = useState("");

    const [shopForFreeChecked, setShopForFreeChecked] = useState(false);
    const [freeSportsAcademyChecked, setFreeSportsAcademyChecked] = useState(false);
    const [freeSkillsChecked, setFreeSkillsChecked] = useState(false);
    const [movieAcademyChecked, setMovieAcademyChecked] = useState(false);
    const [freeCenterForEducationChecked, setFreeCenterForEducationChecked] = useState(false);

    const zoneList = [
        "ADENIRAN OGUNSANYA",
        "AGO/OKOTA",
        "AGUDA/COKER",
        "COSTAIN",
        "IJESHA1",
        "IJESHA2",
        "IKATE",
        "IPONRI",
        "LAWANSON",
        "MASHA/AKERELE",
        "MUSHIN",
        "OJUELEGBA2",
        "OJUELEGBA1",
        "ORILE",
        "YABA1",
        "YABA2",
        "YABA3",
        "OTHERS",

    ]

    const handleShopForFreeChange = () => {
        if (!shopForFreeChecked) {
            setSelectedCategories([...selectedCategories, 'shop for free']);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== 'shop for free'));
        }
        setShopForFreeChecked(!shopForFreeChecked);
    };

    const handleFreeSportsAcademyChange = () => {
        if (!freeSportsAcademyChecked) {
            setSelectedCategories([...selectedCategories, 'free sports academy']);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== 'free sports academy'));
        }
        setFreeSportsAcademyChecked(!freeSportsAcademyChecked);
    };

    const handleFreeSkillsChange = () => {
        if (!freeSkillsChecked) {
            setSelectedCategories([...selectedCategories, 'free skills']);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== 'free skills'));
        }
        setFreeSkillsChecked(!freeSkillsChecked);
    };

    const handleMovieAcademyChange = () => {
        if (!movieAcademyChecked) {
            setSelectedCategories([...selectedCategories, 'movie academy']);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== 'movie academy'));
        }
        setMovieAcademyChecked(!movieAcademyChecked);
    };

    const handleFreeCenterForEducationChange = () => {
        if (!freeCenterForEducationChecked) {
            setSelectedCategories([...selectedCategories, 'free center for education']);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== 'free center for education'));
        }
        setFreeCenterForEducationChecked(!freeCenterForEducationChecked);
    };

    const data = {
        "name": fullname,
        "address": address,
        "age-range": ageRange,
        "bad-comment": badComment,
        "category": selectedCategories,
        "date-of-visit": dateOfVisit,
        "edu-level": eduLevel,
        "feedback": feedback,
        "gender": gender,
        "no-of-attendance": 1,
        "phone": phoneNumber,
        "prayer-request": prayerRequest,
        "zone": zone
    };

    function submitForm() {

        // if (courseName === "" || courseIcon === "") {
        //     setEmptyFields(true);
        //     return
        // } else {
        //     setEmptyFields(false);
        // }

        setLoading(true);

        const model = {
            "name": fullname,
            "address": address,
            "age-range": ageRange,
            "bad-comment": badComment,
            "category": selectedCategories,
            "date-of-visit": dateOfVisit,
            "edu-level": eduLevel,
            "feedback": feedback,
            "gender": gender,
            "no-of-attendance": 1,
            "phone": phoneNumber,
            "prayer-request": prayerRequest,
            "zone": zone
        }

        dispatch(createCourse(model)).then((res) => {
            console.log(res)
            if (res.type === "courses/createCourse/fulfilled") {
                setFullname("");
                setAddress("");
                setAgeRange("");
                setBadComment("");
                setSelectedCategories([]);
                setShopForFreeChecked(false);
                setFreeCenterForEducationChecked(false);
                setFreeSkillsChecked(false);
                setFreeSportsAcademyChecked(false);
                setMovieAcademyChecked(false)
                setDateOfVisit("");
                setEduLevel("");
                setFeedback("");
                setGender("");
                setPhoneNumber("");
                setPrayerRequest("");
                setZone();
                Toastify({
                    node: dom("#success-notification-content")
                        .clone()
                        .removeClass("hidden")[0],
                    duration: 10000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                }).showToast();
                setLoading(false);
            } else {
                Toastify({
                    node: dom("#failed-notification-content")
                        .clone()
                        .removeClass("hidden")[0],
                    duration: 10000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                }).showToast();
                setLoading(false);
            }
        })


    }



    return (
        <>
            <div className="intro-y flex items-center mt-8">
                <h2 className="text-lg font-medium mr-auto">First Timer</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 lg:col-span-6">

                    {/* BEGIN: Form Validation */}
                    <div className="intro-y box">


                        <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                            <h2 className="font-medium text-base mr-auto">
                                Add First Timer
                            </h2>

                        </div>
                        <div className="p-5">

                            <div>
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Fullname
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="first lastname"
                                    value={fullname}
                                    onChange={(e) => { setFullname(e.target.value) }}
                                />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Gender
                                </label>
                                <TomSelect
                                    value={gender}
                                    onChange={setGender}
                                    className="form-control"
                                >
                                    <option value="null">--Select--</option>

                                    <option key="a" value="male">
                                        Male
                                    </option>

                                    <option key="b" value="female">
                                        Femle
                                    </option>

                                </TomSelect>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Age Range
                                </label>
                                <TomSelect
                                    value={ageRange}
                                    onChange={setAgeRange}
                                    className="form-control"
                                >
                                    <option value="null">--Select--</option>

                                    <option key="ar1" value="21-30">
                                        15-20
                                    </option>
                                    <option key="ar1" value="21-30">
                                        21-30
                                    </option>

                                    <option key="ar2" value="31-40">
                                        31-40
                                    </option>
                                    <option key="ar2" value="31-40">
                                        41-50
                                    </option>
                                    <option key="ar2" value="31-40">
                                        51 and Above
                                    </option>

                                </TomSelect>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="address"
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Zone
                                </label>
                                <TomSelect
                                    value={zone}
                                    onChange={setZone}
                                    className="form-control"
                                >
                                    <option value="null">--Select--</option>
                                    {zoneList.map((number) => (
                                        <option key={number} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </TomSelect>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                                />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Feedback
                                </label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Feedback"
                                    value={feedback}
                                    rows={3}
                                    onChange={(e) => { setFeedback(e.target.value) }}
                                ></textarea>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Bad Comment
                                </label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Bad Comment"
                                    value={badComment}
                                    rows={3}
                                    onChange={(e) => { setBadComment(e.target.value) }}
                                ></textarea>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Education Level
                                </label>
                                <TomSelect
                                    value={eduLevel}
                                    onChange={setEduLevel}
                                    className="form-control"
                                >
                                    <option value="null">--Select--</option>

                                    <option key="el1" value="primary">
                                        Primary
                                    </option>
                                    <option key="el2" value="ssce">
                                        SSCE
                                    </option>
                                    <option key="el3" value="graduate">
                                        Graduate
                                    </option>
                                    <option key="el4" value="postGraduate">
                                        Post Graduate
                                    </option>

                                </TomSelect>
                            </div>
                            <div className="mt-3">
                                <label className="form-label">Category</label>

                                <div className="form-check mt-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="shop for free"
                                        checked={shopForFreeChecked}
                                        onChange={handleShopForFreeChange}
                                    />

                                    <label className="form-check-label">Shop for Free</label>
                                </div>

                                <div className="form-check mt-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="free sports academy"
                                        checked={freeSportsAcademyChecked}
                                        onChange={handleFreeSportsAcademyChange}
                                    />
                                    <label className="form-check-label">Free Sports Academy</label>
                                </div>

                                <div className="form-check mt-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="free skills"
                                        checked={freeSkillsChecked}
                                        onChange={handleFreeSkillsChange}
                                    />
                                    <label className="form-check-label">Free Skills</label>
                                </div>

                                <div className="form-check mt-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="movie academy"
                                        checked={movieAcademyChecked}
                                        onChange={handleMovieAcademyChange}
                                    />
                                    <label className="form-check-label">Movie Academy</label>
                                </div>

                                <div className="form-check mt-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="free center for education"
                                        checked={freeCenterForEducationChecked}
                                        onChange={handleFreeCenterForEducationChange}
                                    />
                                    <label className="form-check-label">Free Center for Education</label>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Prayer Request
                                </label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Prayer Requeat"
                                    value={prayerRequest}
                                    rows={3}
                                    onChange={(e) => { setPrayerRequest(e.target.value) }}
                                ></textarea>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="vertical-form-1" className="form-label">
                                    Date of visit
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Date of first visit"
                                    value={dateOfVisit}
                                    onChange={(e) => { setDateOfVisit(e.target.value) }}
                                />
                            </div>

                            <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
                                {emptyFields && <div className="text-danger">Blank Fields</div>}
                                {loading ? (<button className="w-24 h-6"><LoadingIcon icon="puff" /></button>) : (<button
                                    type="button"
                                    className="btn py-3 btn-primary" onClick={submitForm}>
                                    Save
                                </button>)}

                            </div>


                        </div>


                    </div>
                    {/* END: Form Validation */}
                    {/* BEGIN: Success Notification Content */}
                    <div
                        id="success-notification-content"
                        className="toastify-content hidden flex"
                    >
                        <Lucide icon="CheckCircle" className="text-success" />
                        <div className="ml-4 mr-4">
                            <div className="font-medium">Registration success!</div>
                            <div className="text-slate-500 mt-1">
                                User has been registered successfully!
                            </div>
                        </div>
                    </div>
                    {/* END: Success Notification Content */}
                    {/* BEGIN: Failed Notification Content */}
                    <div
                        id="failed-notification-content"
                        className="toastify-content hidden flex"
                    >
                        <Lucide icon="XCircle" className="text-danger" />
                        <div className="ml-4 mr-4">
                            <div className="font-medium">Registration failed!</div>
                            <div className="text-slate-500 mt-1">
                                {apiError}
                            </div>
                        </div>
                    </div>
                    {/* END: Failed Notification Content */}
                </div>
            </div>
        </>
    );
}

export default Main;
