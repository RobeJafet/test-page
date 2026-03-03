'use client';

import ButtonOnForm from "./ButtonOnForm";
import { useI18n } from "../config/i18n/i18nProvider";
import { useState } from "react";

export default function Form({ lang }: { lang: LocalePage }) {
    const { dict } = useI18n();
    const [values, setValues] = useState({
        name: "",
        company: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [contactMessage, setContactMessage] = useState(dict.contact.no_send);
    const [isVisible, setIsVisible] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validate() {
        let errs: { [key: string]: string } = {};
        if (!values.name.trim()) errs.name = dict.contact.errors.empty_field;
        if (!values.email.trim()) errs.email = dict.contact.errors.empty_field;
        if (!values.message.trim())
            errs.message = dict.contact.errors.empty_field;

        if (values.email && !emailRegex.test(values.email)) {
            errs.email = dict.contact.errors.invalid_email;
        }
        return errs;
    }
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => {
            if (prevErrors[name]) {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            }
            return { ...prevErrors };
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Mostrar toast enviando
            setContactMessage(dict.contact.sending);
            setIsVisible(true);

            try {
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                const data = await res.json();

                if (data.success) {
                    setContactMessage(dict.contact.success);
                    setValues({
                        name: "",
                        company: "",
                        email: "",
                        message: "",
                    });
                } else {
                    setContactMessage(dict.contact.errors.send_error);
                }
            } catch {
                setContactMessage(dict.contact.errors.send_error);
            }
            setTimeout(() => {
                setIsVisible(false);
            }, 1500);
        }
    }

    return (
        <>
        <form className="row gap-y-8 pt-blue" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2">
                <label className="detail" htmlFor="fullName">
                    {dict.contact.name}
                </label>
                <input
                    name="name"
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    className="bg-white border-second-gray h-[39px] border rounded-[5px] p-4"
                />
                {errors.name && (
                    <div className="detail text-red-500">{errors.name}</div>
                )}
            </div>
            <div className="w-full md:w-6/12 flex flex-col gap-2">
                <label className="detail" htmlFor="email">
                    {dict.contact.email}
                </label>
                <input
                    name="email"
                    id="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    className="bg-white border-second-gray h-[39px] border rounded-[5px] p-4"
                />
                {errors.email && (
                    <div className="detail text-red-500">{errors.email}</div>
                )}
            </div>
            <div className="w-full md:w-6/12 flex flex-col gap-2">
                <label className="detail" htmlFor="company">
                    {dict.contact.company}
                </label>
                <input
                    name="company"
                    id="company"
                    type="text"
                    value={values.company}
                    onChange={handleChange}
                    className="bg-white border-second-gray h-[39px] border rounded-[5px] p-4"
                />
            </div>
            <div className="w-full flex flex-col gap-2">
                <label className="detail" htmlFor="message">
                    {dict.contact.message}
                </label>
                <textarea
                    name="message"
                    id="message"
                    value={values.message}
                    onChange={handleChange}
                    className="bg-white border-second-gray h-48 border resize-none rounded-[5px] p-4"
                ></textarea>
                {errors.message && (
                    <div className="detail text-red-500">{errors.message}</div>
                )}
            </div>
            <div className="w-full flex justify-center pt-4">
                <button
                    type="submit"
                    className={`flex ${
                        errors && Object.keys(errors).length > 0
                            ? "opacity-50"
                            : ""
                    } ${isVisible ? "disabled" : ""}`}
                    disabled={errors && Object.keys(errors).length > 0}
                >
                    <ButtonOnForm />
                </button>
            </div>
        </form>
        {contactMessage && (
            <div className={`fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-100 transition-opacity duration-500 pointer-events-none ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <p className="uppercase p-8 bg-black text-white">{contactMessage}</p>
            </div>
        )}
        </>
    );
}
