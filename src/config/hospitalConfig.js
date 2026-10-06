/**
 * Masaraddi Neuro Care Center - Verified Hospital Configuration
 * 
 * Sourced directly from approved hospital information form.
 * Contains verified doctor credentials, OPD timings, confirmed clinical facilities,
 * and contact details.
 */

export const hospitalConfig = {
  hospitalName: "Masaraddi Neuro Care Center",
  category: "Specialized Neurological Care Center",
  tagline: "Dedicated Neurological Consultations & Clinical Care",
  headline: "Complete Neurological Services in Bagalkot",
  supportingText: "Providing patient-focused clinical neurology consultations, dedicated stroke care, epilepsy management, and inpatient monitoring under Dr. Shivkumar Masaraddi.",
  established: "Established in May 2025",
  
  contact: {
    phone: "+918354220000",
    phoneDisplay: "+91 8354 220000",
    alternatePhone: "+919448000000",
    alternatePhoneDisplay: "+91 94480 00000",
    whatsappNumber: "919448000000",
    whatsappDisplay: "+91 94480 00000",
    whatsappMessage: "Hello, I am contacting Masaraddi Neuro Care Center to check doctor availability and schedule a consultation.",
    
    // Verified email from form
    email: "neurocarecentermasaraddi@gmail.com",
    
    // Verified address from form
    address: {
      street: "Gouri Layout, Rotary Circle, Navanagar Road",
      landmark: "Near Rotary Circle",
      city: "Bagalkot",
      state: "Karnataka",
      country: "India",
      full: "Masaraddi Neuro Care Center, Gouri Layout, Rotary Circle, Navanagar Road, Bagalkot, Karnataka",
    },
    
    // Verified timings from form
    timings: {
      opd: "10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM",
      opdSlot1: "10:00 AM – 4:00 PM",
      opdSlot2: "6:00 PM – 8:00 PM",
      emergency: "Emergency Care Available",
    },

    appointmentNote: "Call the hospital to check doctor availability and schedule your visit.",
    
    // Google Maps Bagalkot coordinates
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.957678523315!2d75.698000!3d16.181000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc778b4dc0e0001%3A0x2a3e0bf0a36e91cf!2sNavanagar%2C%20Bagalkot%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Gouri+Layout+Rotary+Circle+Navanagar+Road+Bagalkot+Karnataka",
  },
  
  heroSlides: [
    {
      id: "hero-1",
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1920&auto=format&fit=crop",
      title: "Clinical Neurological Healthcare Center",
      caption: "Specialized center for comprehensive brain, spine, and nerve disorders in Bagalkot",
      altText: "Masaraddi Neuro Care Center hospital premises in Bagalkot",
      tag: "Hospital Premises"
    },
    {
      id: "hero-2",
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1920&auto=format&fit=crop",
      title: "Doctor Consultation Chamber",
      caption: "Private clinical evaluation suite for neurological consultations and reflex examinations",
      altText: "Doctor consultation desk for neurology evaluations",
      tag: "Neurology Consultation"
    },
    {
      id: "hero-3",
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1920&auto=format&fit=crop",
      title: "7 ICU & Inpatient Care Beds",
      caption: "Equipped 7-bed intensive care unit with continuous patient vital monitoring",
      altText: "ICU patient care beds and clinical monitoring setup",
      tag: "7 ICU Facilities"
    },
    {
      id: "hero-4",
      url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1920&auto=format&fit=crop",
      title: "Inpatient Observation & Recovery",
      caption: "Sterile patient accommodations with dedicated nursing supervision",
      altText: "Inpatient observation room and patient care",
      tag: "Inpatient Care"
    },
    {
      id: "hero-5",
      url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1920&auto=format&fit=crop",
      title: "Hospital Reception & Patient Desk",
      caption: "Patient assistance desk located at Gouri Layout, Rotary Circle, Navanagar Road",
      altText: "Hospital reception and patient service desk",
      tag: "Patient Helpdesk"
    }
  ],
  
  services: [
    {
      id: "complete-neurology",
      name: "Complete Neurological Services",
      category: "Neurology Consultations",
      isPrimaryConfirmed: true,
      shortDescription: "In-depth clinical evaluation and medical management of brain, nerve, spine, and neuromuscular conditions.",
      detailedDescription: "Masaraddi Neuro Care Center provides thorough clinical consultations for patients presenting with neurological symptoms. Our evaluation includes detailed patient history review, cranial nerve examination, motor and sensory assessments, reflex analysis, and individual treatment planning.",
      commonSymptoms: [
        "Unexplained headaches and dizziness",
        "Numbness, tingling, or weakness in limbs",
        "Balance difficulties or gait unsteadiness",
        "Memory or cognitive changes",
        "Muscle twitching, spasms, or tremors"
      ],
      whatWeOffer: [
        "Clinical specialist examination and reflex evaluation",
        "Evidence-based diagnostic and treatment roadmap",
        "Prescription guidance and regular follow-up reviews",
        "Coordination with inpatient care when indicated"
      ],
      icon: "Brain"
    },
    {
      id: "stroke-care",
      name: "Stroke Care & Rehabilitation",
      category: "Acute & Post-Acute Care",
      isPrimaryConfirmed: true,
      shortDescription: "Post-stroke clinical assessment, secondary stroke prevention medical therapy, and guided neuro-rehabilitation.",
      detailedDescription: "For individuals recovering from ischemic or hemorrhagic stroke, structured clinical monitoring and secondary prevention are essential. We provide post-stroke neurological assessments, medical management of risk factors (blood pressure and blood thinners), and functional rehabilitation planning.",
      commonSymptoms: [
        "Sudden weakness or numbness on one side of face or body",
        "Difficulty speaking, slurred speech, or comprehension difficulty",
        "Sudden loss of balance or coordination",
        "Post-stroke muscle stiffness or reduced mobility"
      ],
      whatWeOffer: [
        "Clinical neurological health assessment after stroke",
        "Secondary stroke prevention medication regimens",
        "Physiotherapy and mobility recovery guidance",
        "Caregiver counseling for home-based recovery support"
      ],
      icon: "Activity"
    },
    {
      id: "epilepsy-care",
      name: "Epilepsy & Seizure Management",
      category: "Chronic Neurological Care",
      isPrimaryConfirmed: true,
      shortDescription: "Diagnostic seizure classification, anti-epileptic drug optimization, seizure control protocols, and patient safety counseling.",
      detailedDescription: "Epilepsy requires accurate classification of seizure episodes to select the appropriate anti-seizure medication regimen. We provide continuous outpatient management for adults and pediatric patients, focusing on seizure control and monitoring medication efficacy.",
      commonSymptoms: [
        "Episodes of involuntary jerking, stiffening, or convulsions",
        "Brief staring spells or temporary loss of awareness",
        "Sudden unprovoked falls or fainting episodes",
        "Sensory aura or unusual smells before an episode"
      ],
      whatWeOffer: [
        "Detailed seizure history and clinical classification",
        "Anti-epileptic medication stabilization and dosage review",
        "Patient safety counseling (sleep hygiene, precautions)",
        "Long-term follow-up to support seizure freedom"
      ],
      icon: "ShieldAlert"
    },
    {
      id: "headache-migraine",
      name: "Headache & Migraine Care",
      category: "Specialized Clinic",
      isPrimaryConfirmed: false,
      shortDescription: "Clinical diagnosis and management for chronic migraines, tension-type headaches, and facial nerve pain.",
      detailedDescription: "Headaches can significantly impact daily life. We evaluate primary and secondary headache causes, identify potential lifestyle triggers, and prescribe medical therapies for preventive and acute symptom relief.",
      commonSymptoms: [
        "Throbbing unilateral or bilateral head pain",
        "Headache accompanied by nausea, light, or sound sensitivity",
        "Chronic daily tension around forehead and neck",
        "Shooting facial pain"
      ],
      whatWeOffer: [
        "Clinical distinction between headache types",
        "Preventive and acute medication protocols",
        "Identification of triggers and lifestyle advice",
        "Regular monitoring of treatment response"
      ],
      icon: "Zap"
    },
    {
      id: "nerve-neuropathy",
      name: "Nerve & Peripheral Neuropathy Care",
      category: "Neuromuscular Health",
      isPrimaryConfirmed: false,
      shortDescription: "Evaluation of peripheral nerve disorders, diabetic neuropathy, burning feet sensations, and spinal nerve compression.",
      detailedDescription: "Disorders of the peripheral nerves cause numbness, tingling, burning pain, and muscle weakness. We assess causes such as diabetic neuropathy, sciatica, and radiculopathy to provide medical symptom relief and physical therapy recommendations.",
      commonSymptoms: [
        "Burning sensation or numbness in feet and hands",
        "Pain radiating along the leg (sciatica) or arm (radiculopathy)",
        "Loss of sensation or pin-and-needle sensations",
        "Weakness in grasping or walking"
      ],
      whatWeOffer: [
        "Peripheral nerve screening and glycemic neuropathy care",
        "Cervical and lumbar spine nerve evaluation",
        "Medical nerve pain management",
        "Physiotherapy and mobility recommendations"
      ],
      icon: "FileText"
    },
    {
      id: "movement-disorders",
      name: "Movement & Tremor Evaluation",
      category: "Clinical Neurology",
      isPrimaryConfirmed: false,
      shortDescription: "Clinical evaluation for Parkinson's disease, tremors, muscle rigidity, and balance disorders.",
      detailedDescription: "Movement disorders require ongoing clinical supervision. We conduct physical evaluations to identify movement symptoms and tailor medical therapies to support mobility, daily functioning, and quality of life.",
      commonSymptoms: [
        "Resting tremors in hands, fingers, or jaw",
        "Slowness of voluntary movement (bradykinesia)",
        "Stiffness in arms, legs, or trunk",
        "Postural instability or walking difficulty"
      ],
      whatWeOffer: [
        "Differential clinical evaluation of tremors and gait",
        "Medical therapy titration and follow-up reviews",
        "Balance and fall-prevention guidance",
        "Caregiver advice for everyday support"
      ],
      icon: "HeartPulse"
    }
  ],
  
  // Single verified doctor from submitted form
  doctors: [
    {
      id: "dr-shivkumar-masaraddi",
      name: "Dr. Shivkumar Masaraddi",
      specialization: "Neurology",
      qualificationsList: [
        "MBBS — J.N. Medical College, Belagavi",
        "MD — General Medicine, NHL Municipal Medical College, Ahmedabad",
        "DM — Neurology, Bangur Institute of Neurosciences, IPGMER, Kolkata"
      ],
      qualificationsSummary: "MBBS, MD (General Medicine), DM (Neurology)",
      experience: "12+ Years of Experience",
      bio: "Dr. Shivkumar Masaraddi is a Neurologist with over 12 years of clinical medical experience (since 2014). He completed his MBBS from J.N. Medical College, Belagavi, MD in General Medicine from NHL Municipal Medical College, Ahmedabad, and DM in Neurology from the Bangur Institute of Neurosciences, IPGMER, Kolkata. He provides clinical evaluation and care for stroke, epilepsy, and complete neurological disorders at Masaraddi Neuro Care Center in Bagalkot.",
      timings: "10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
      departments: [
        "Complete Neurological Services",
        "Stroke Care",
        "Epilepsy & Seizures",
        "Clinical Neurology"
      ]
    }
  ],
  
  // Exactly 6 facilities confirmed in the form
  facilities: [
    {
      id: "fac-icu",
      title: "7 ICU / Patient Care Facilities",
      shortTitle: "7 ICU",
      category: "Critical Care",
      description: "Equipped 7-bed Intensive Care Unit dedicated to acute neurological observation and patient monitoring.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
      features: [
        "7 ICU patient beds",
        "Vital parameters monitoring",
        "Sterile clinical environment",
        "Dedicated nursing care"
      ],
      altText: "7 ICU patient care unit at Masaraddi Neuro Care Center",
      icon: "BedDouble"
    },
    {
      id: "fac-pharmacy",
      title: "Pharmacy",
      shortTitle: "Pharmacy",
      category: "Medication Services",
      description: "Available on-premises pharmacy ensuring immediate access to prescribed neurological and general medications.",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Prescribed neurological medicines",
        "Dispensing by qualified staff",
        "Convenient on-site availability",
        "Emergency medication support"
      ],
      altText: "Hospital pharmacy at Masaraddi Neuro Care Center",
      icon: "Pill"
    },
    {
      id: "fac-laboratory",
      title: "Laboratory",
      shortTitle: "Laboratory",
      category: "Diagnostic Support",
      description: "Available clinical laboratory for routine and essential diagnostic investigations supporting medical evaluations.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Clinical sample processing",
        "Essential blood and diagnostic tests",
        "Timely report availability",
        "Specialist test correlation"
      ],
      altText: "Diagnostic laboratory at Masaraddi Neuro Care Center",
      icon: "FlaskConical"
    },
    {
      id: "fac-physiotherapy",
      title: "Physiotherapy",
      shortTitle: "Physiotherapy",
      category: "Neuro-Rehabilitation",
      description: "Available physiotherapy services supporting motor recovery, post-stroke rehabilitation, and mobility improvement.",
      image: "https://images.unsplash.com/photo-1594824813511-20f545a95393?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Post-stroke physical rehabilitation",
        "Mobility and gait support",
        "Muscle strength retraining",
        "Guided exercise therapy"
      ],
      altText: "Physiotherapy facility at Masaraddi Neuro Care Center",
      icon: "Activity"
    },
    {
      id: "fac-xray",
      title: "X-Ray",
      shortTitle: "X-Ray",
      category: "Imaging Services",
      description: "Available diagnostic X-Ray imaging facility for rapid clinical assessments of skeletal and spinal structures.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Diagnostic radiography",
        "Rapid image processing",
        "Spine and skeletal imaging",
        "Direct clinical correlation"
      ],
      altText: "Diagnostic X-Ray unit at Masaraddi Neuro Care Center",
      icon: "Scan"
    },
    {
      id: "fac-ot",
      title: "OT (Operation Theatre)",
      shortTitle: "OT",
      category: "Surgical & Procedure Suite",
      description: "Available Operation Theatre facility maintained with sterile standards for required medical procedures.",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Sterile surgical environment",
        "Medical procedure capabilities",
        "Equipped for clinical requirements",
        "Inpatient recovery link"
      ],
      altText: "Operation theatre at Masaraddi Neuro Care Center",
      icon: "ShieldPlus"
    }
  ],
  
  gallery: [
    {
      id: "gal-1",
      title: "Hospital Building & Front Entrance",
      category: "exterior",
      categoryLabel: "Premises",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
      caption: "Hospital premises located at Gouri Layout, Rotary Circle, Navanagar Road, Bagalkot.",
      altText: "Masaraddi Neuro Care Center hospital premises"
    },
    {
      id: "gal-2",
      title: "Doctor Consultation Chamber",
      category: "consultation",
      categoryLabel: "Doctor Consultation",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
      caption: "Neurology consultation chamber for clinical examinations and reflex assessments.",
      altText: "Neurology consultation desk at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-3",
      title: "7 ICU Patient Care Unit",
      category: "patient_care",
      categoryLabel: "ICU & Inpatient",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
      caption: "Dedicated 7-bed ICU facility equipped for attentive patient care.",
      altText: "ICU care beds at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-4",
      title: "Hospital Reception Desk",
      category: "facilities",
      categoryLabel: "Reception",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop",
      caption: "Hospital reception counter for patient assistance and OPD inquiries.",
      altText: "Reception desk at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-5",
      title: "Clinical Diagnostic Support",
      category: "diagnostics",
      categoryLabel: "Laboratory & Diagnostics",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
      caption: "Clinical laboratory and diagnostic investigation support area.",
      altText: "Clinical diagnostic area at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-6",
      title: "Patient & Family Waiting Lounge",
      category: "facilities",
      categoryLabel: "Waiting Lounge",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop",
      caption: "Clean, comfortable seating area for patients and visiting family members.",
      altText: "Patient waiting area at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-7",
      title: "Physiotherapy & Recovery Area",
      category: "patient_care",
      categoryLabel: "Physiotherapy",
      image: "https://images.unsplash.com/photo-1594824813511-20f545a95393?q=80&w=1200&auto=format&fit=crop",
      caption: "Dedicated physiotherapy space supporting post-stroke rehabilitation and mobility.",
      altText: "Physiotherapy area at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-8",
      title: "Pharmacy & Medication Desk",
      category: "facilities",
      categoryLabel: "Pharmacy",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1200&auto=format&fit=crop",
      caption: "On-site hospital pharmacy dispensing prescribed neurological medicines.",
      altText: "Hospital pharmacy at Masaraddi Neuro Care Center"
    }
  ]
};
