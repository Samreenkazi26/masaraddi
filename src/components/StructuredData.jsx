import React, { useEffect } from 'react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const StructuredData = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];

  useEffect(() => {
    // MedicalOrganization & Hospital Schema
    const hospitalSchema = {
      "@context": "https://schema.org",
      "@type": ["Hospital", "MedicalOrganization", "MedicalBusiness"],
      "name": data.hospitalName,
      "alternateName": [
        "Masaraddi Neuro Care Center Bagalkot",
        "Masaraddi Neurology Hospital",
        "Dr Shivkumar Masaraddi Clinic"
      ],
      "description": "Masaraddi Neuro Care Center in Bagalkot, Karnataka is led by Dr. Shivkumar Masaraddi (DM Neurology). Providing complete neurological services, dedicated stroke care, epilepsy management, and 7 ICU beds.",
      "url": "https://masaraddineurocare.com",
      "image": data.heroSlides.map((s) => s.url),
      "telephone": data.contact.phone,
      "email": data.contact.email,
      "priceRange": "$$",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": data.contact.address.street,
        "addressLocality": data.contact.address.city,
        "addressRegion": data.contact.address.state,
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 16.181,
        "longitude": 75.698
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "16:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "18:00",
          "closes": "20:00"
        }
      ],
      "medicalSpecialty": [
        "https://schema.org/Neurology"
      ],
      "availableService": data.services.map((s) => ({
        "@type": "MedicalProcedure",
        "name": s.name,
        "description": s.shortDescription
      })),
      "physician": {
        "@type": "Physician",
        "name": doctor?.name || "Dr. Shivkumar Masaraddi",
        "medicalSpecialty": "Neurology",
        "description": doctor?.bio,
        "jobTitle": "Consultant Neurologist"
      },
      "areaServed": [
        { "@type": "City", "name": "Bagalkot" },
        { "@type": "City", "name": "Navanagar" },
        { "@type": "City", "name": "Badami" },
        { "@type": "City", "name": "Jamkhandi" },
        { "@type": "City", "name": "Mudhol" },
        { "@type": "City", "name": "Ilkal" },
        { "@type": "City", "name": "Bilagi" },
        { "@type": "City", "name": "Guledgudda" },
        { "@type": "AdministrativeArea", "name": "Bagalkot District" },
        { "@type": "AdministrativeArea", "name": "North Karnataka" }
      ]
    };

    // FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What neurological services are available at Masaraddi Neuro Care Center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Complete neurological services led by Dr. Shivkumar Masaraddi (DM Neurology), including stroke care and neuro-rehabilitation, epilepsy and seizure management, headache and migraine care, and 7 ICU beds for inpatient care."
          }
        },
        {
          "@type": "Question",
          "name": "What are the doctor consultation timings in Bagalkot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `OPD consultations are available from ${data.contact.timings.opdSlot1} and ${data.contact.timings.opdSlot2}, Monday through Saturday.`
          }
        },
        {
          "@type": "Question",
          "name": "How can I book a consultation with the neurologist in Bagalkot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Consultations are scheduled by direct phone call to check doctor availability at ${data.contact.phoneDisplay}. Walk-in patients are also seen during OPD hours.`
          }
        },
        {
          "@type": "Question",
          "name": "Where is Masaraddi Neuro Care Center located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gouri Layout, Rotary Circle, Navanagar Road, Bagalkot, Karnataka."
          }
        },
        {
          "@type": "Question",
          "name": "Is stroke care and rehabilitation available in Bagalkot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, post-stroke clinical assessments, secondary stroke prevention medication protocols, and guided neuro-rehabilitation are available."
          }
        },
        {
          "@type": "Question",
          "name": "Is epilepsy and seizure management available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, specialized seizure evaluation, medication stabilization, and long-term epilepsy management are provided."
          }
        },
        {
          "@type": "Question",
          "name": "What facilities are available at Masaraddi Neuro Care Center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "7 ICU beds, on-premises Pharmacy, Diagnostic Laboratory, Physiotherapy department, X-Ray imaging, and Operation Theatre (OT)."
          }
        }
      ]
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://masaraddineurocare.com/#home" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://masaraddineurocare.com/#services" },
        { "@type": "ListItem", "position": 3, "name": "Doctors", "item": "https://masaraddineurocare.com/#doctors" },
        { "@type": "ListItem", "position": 4, "name": "Facilities", "item": "https://masaraddineurocare.com/#facilities" },
        { "@type": "ListItem", "position": 5, "name": "Gallery", "item": "https://masaraddineurocare.com/#gallery" },
        { "@type": "ListItem", "position": 6, "name": "FAQ", "item": "https://masaraddineurocare.com/#faq" },
        { "@type": "ListItem", "position": 7, "name": "Contact", "item": "https://masaraddineurocare.com/#contact" }
      ]
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(hospitalSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(faqSchema);
    document.head.appendChild(script2);

    const script3 = document.createElement('script');
    script3.type = 'application/ld+json';
    script3.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script3);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
      if (document.head.contains(script3)) document.head.removeChild(script3);
    };
  }, [data, doctor]);

  return null;
};
