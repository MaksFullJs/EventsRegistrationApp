import './EventRegistration.css'
import Icon, {
    UserOutlined,
    WomanOutlined
} from "@ant-design/icons";
import { useState } from 'react';
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { registerForEvent } from '../../api/api';
import { useParams, useNavigate } from "react-router-dom";


function EventRegistration() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        birthdate: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
    });

    const [selectedAnswer, setSelectedAnswer] = useState('');

    const validateFullName = (name) => {
        if (!name.trim()) {
            return 'Ім’я не може бути порожнім';
        } else if (name.length < 2) {
            return 'Ім’я має містити мінімум 2 символи';
        } else if (name.length > 50) {
            return 'Ім’я має містити максимум 50 символів';
        }
        return '';
    };

    const validateEmail = (email) => {
        if (!email.trim()) {
            return 'Email не може бути порожнім';
        } else if (!/^[\w-.]+@(gmail\.com|googlemail\.com)$/.test(email)
        ) {
            return 'Only gmail adress';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (name === 'fullName') {
            const error = validateFullName(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                fullName: error,
            }));
        }

        if (name === 'email') {
            const error = validateEmail(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: error,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullNameError = validateFullName(formValues.fullName);
        const emailError = validateEmail(formValues.email);

        if (fullNameError || emailError) {
            setErrors({
                fullName: fullNameError,
                email: emailError,
            });
        } else {
            try {
                const response = await registerForEvent(formValues, id, selectedAnswer);
                console.log(response.data);
                alert(response.data.message)
            } catch (error) {
                alert(error.response.data.message);
            }
        }
        navigate(`/`)
    };

    const onChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setFormValues((prevValues) => ({
            ...prevValues,
            birthdate: formattedDate,
        }));
        console.log('Відформатована дата:', formattedDate);
    };

    return (
        <div className='signup__page'>
            <div className='signup__form'>
                <h1>Event registration</h1>
                <form>
                    <div className='input__block'>
                        <div className='input__field'>
                            <Icon className='icon' component={WomanOutlined} />
                            <input onChange={handleChange} name='fullName' type='text' placeholder='Full name'></input>
                            {errors.fullName && <div className='error'>{errors.fullName}</div>}
                        </div>
                        <div className='input__field'>
                            <Icon className='icon' component={UserOutlined} />
                            <input onChange={handleChange} name='email' type='text' placeholder='Email'></input>
                            {errors.email && <div className='error'>{errors.email}</div>}
                        </div>
                        <DatePicker onChange={onChange} />
                        <div className='input__radio'>
                            <input
                                type="radio"
                                name="question"
                                value="Social media"
                                checked={selectedAnswer === 'Social media'}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                            />
                            <p>Social media</p>
                            <input
                                type="radio"
                                name="question"
                                value="Friends"
                                checked={selectedAnswer === 'Friends'}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                            />
                            <p>Friends</p>
                            <input
                                type="radio"
                                name="question"
                                value="Found myself"
                                checked={selectedAnswer === 'Found myself'}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                            />
                            <p>Found myself</p>
                        </div>

                    </div>
                </form>
                <button onClick={handleSubmit} className='input__btn'>Register</button>
            </div>
        </div>
    )
}


export default EventRegistration;