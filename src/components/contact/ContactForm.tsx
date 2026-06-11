"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { contactFormLabels, phoneCountryCode } from "@/data/contactContent";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Send Message</h2>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="contact-name" className={styles.srOnly}>
              {contactFormLabels.name}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder={contactFormLabels.name}
              autoComplete="name"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-phone" className={styles.srOnly}>
              {contactFormLabels.phone}
            </label>
            <div className={styles.phoneField}>
              <select
                id="contact-country"
                name="countryCode"
                className={styles.countrySelect}
                defaultValue={phoneCountryCode}
                aria-label="Country code"
              >
                <option value="+91">+91</option>
              </select>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder={contactFormLabels.phone}
                autoComplete="tel-national"
                className={styles.input}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="contact-email" className={styles.srOnly}>
              {contactFormLabels.email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder={contactFormLabels.email}
              autoComplete="email"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-location" className={styles.srOnly}>
              {contactFormLabels.location}
            </label>
            <input
              id="contact-location"
              name="location"
              type="text"
              placeholder={contactFormLabels.location}
              autoComplete="address-level2"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-message" className={styles.srOnly}>
            {contactFormLabels.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder={contactFormLabels.message}
            rows={5}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>

        <div className={styles.actions}>
          <Button type="submit" variant="burgundy">
            {contactFormLabels.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}
