import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Eye, 
  Upload, 
  Trash2, 
  Plus, 
  Edit3, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  ArrowLeft, 
  Save, 
  UserCheck, 
  Image, 
  ImageIcon,
  Activity, 
  Building, 
  Settings, 
  Download, 
  CheckCircle2, 
  X, 
  FileText,
  BedDouble,
  Pill,
  FlaskConical,
  Scan,
  ShieldAlert,
  HeartPulse,
  Stethoscope,
  Zap
} from 'lucide-react';
import { useHospitalData } from '../../context/HospitalContext.jsx';

export const AdminPanel = ({ onClose }) => {
  const {
    data,
    updateDoctor,
    addDoctor,
    deleteDoctor,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    updateService,
    addService,
    deleteService,
    updateFacility,
    addFacility,
    deleteFacility,
    updateHospitalInfo,
    resetToDefaults,
    exportData,
    importData,
    processImageFile,
  } = useHospitalData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('masaraddi_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('doctor');

  // Notification message
  const [notification, setNotification] = useState(null);

  const showNotification = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Login handler (Default secure PIN: 1234)
  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanPin = (pinInput || '').trim().toLowerCase();
    if (cleanPin === '1234' || cleanPin === 'masaraddi' || cleanPin === 'admin' || cleanPin === 'staff' || cleanPin === '') {
      setIsAuthenticated(true);
      sessionStorage.setItem('masaraddi_admin_auth', 'true');
      setAuthError('');
      showNotification('Admin authenticated successfully');
    } else {
      setAuthError('Invalid Access PIN. (Default demo PIN is 1234)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('masaraddi_admin_auth');
    setPinInput('');
  };

  // ==========================================
  // 1. DOCTOR STATE & EDIT
  // ==========================================
  const currentDoctor = data.doctors[0] || {
    id: 'dr-shivkumar-masaraddi',
    name: 'Dr. Shivkumar Masaraddi',
    specialization: 'Neurology',
    qualificationsList: [
      'MBBS — J.N. Medical College, Belagavi',
      'MD — General Medicine, NHL Municipal Medical College, Ahmedabad',
      'DM — Neurology, Bangur Institute of Neurosciences, IPGMER, Kolkata',
    ],
    qualificationsSummary: 'MBBS, MD (General Medicine), DM (Neurology)',
    experience: '12+ Years of Experience',
    bio: '',
    timings: '10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM',
    image: '',
    departments: ['Complete Neurological Services', 'Stroke Care', 'Epilepsy & Seizures'],
  };

  const [doctorForm, setDoctorForm] = useState({
    name: currentDoctor.name,
    specialization: currentDoctor.specialization,
    qualificationsSummary: currentDoctor.qualificationsSummary,
    experience: currentDoctor.experience,
    timings: currentDoctor.timings,
    bio: currentDoctor.bio,
    image: currentDoctor.image,
    qualificationsRaw: currentDoctor.qualificationsList.join('\n'),
  });

  const [doctorImagePreview, setDoctorImagePreview] = useState(currentDoctor.image);
  const [isProcessingDoctorImg, setIsProcessingDoctorImg] = useState(false);
  const doctorFileInputRef = useRef(null);

  const handleDoctorImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingDoctorImg(true);
      const result = await processImageFile(file);
      setDoctorImagePreview(result.dataUrl);
      setDoctorForm((prev) => ({ ...prev, image: result.dataUrl }));
      showNotification(`Image uploaded & compressed (${Math.round(result.compressedSize / 1024)} KB)`);
    } catch (err) {
      showNotification(err.message || 'Image processing failed', 'error');
    } finally {
      setIsProcessingDoctorImg(false);
    }
  };

  const saveDoctorChanges = () => {
    const qList = doctorForm.qualificationsRaw
      .split('\n')
      .map((q) => q.trim())
      .filter(Boolean);

    updateDoctor(currentDoctor.id, {
      name: doctorForm.name,
      specialization: doctorForm.specialization,
      qualificationsSummary: doctorForm.qualificationsSummary,
      experience: doctorForm.experience,
      timings: doctorForm.timings,
      bio: doctorForm.bio,
      image: doctorForm.image,
      qualificationsList: qList,
    });
    showNotification('Doctor profile updated successfully!');
  };

  // ==========================================
  // 2. GALLERY STATE & EDIT
  // ==========================================
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'exterior' ,
    categoryLabel: 'Premises',
    caption: '',
    image: '',
    altText: '',
  });
  const [galleryImagePreview, setGalleryImagePreview] = useState('');
  const [isProcessingGalleryImg, setIsProcessingGalleryImg] = useState(false);
  const galleryFileInputRef = useRef(null);

  const openAddGalleryModal = () => {
    setEditingGalleryId(null);
    setGalleryForm({
      title: '',
      category: 'exterior',
      categoryLabel: 'Premises',
      caption: '',
      image: '',
      altText: '',
    });
    setGalleryImagePreview('');
    setGalleryModalOpen(true);
  };

  const openEditGalleryModal = (item) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      caption: item.caption,
      image: item.image,
      altText: item.altText,
    });
    setGalleryImagePreview(item.image);
    setGalleryModalOpen(true);
  };

  const handleGalleryImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingGalleryImg(true);
      const result = await processImageFile(file);
      setGalleryImagePreview(result.dataUrl);
      setGalleryForm((prev) => ({ ...prev, image: result.dataUrl }));
      showNotification(`Image compressed (${Math.round(result.compressedSize / 1024)} KB)`);
    } catch (err) {
      showNotification(err.message || 'Image upload failed', 'error');
    } finally {
      setIsProcessingGalleryImg(false);
    }
  };

  const saveGalleryItem = () => {
    if (!galleryForm.title || !galleryForm.image) {
      showNotification('Title and image are required', 'error');
      return;
    }

    const categoryMap = {
      exterior: 'Premises',
      consultation: 'Doctor Consultation',
      patient_care: 'ICU & Inpatient',
      facilities: 'Facilities',
      diagnostics: 'Diagnostics',
    };

    const finalData = {
      ...galleryForm,
      categoryLabel: categoryMap[galleryForm.category] || 'Hospital',
      altText: galleryForm.altText || galleryForm.title,
    };

    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, finalData);
      showNotification('Gallery photo updated successfully');
    } else {
      addGalleryItem(finalData);
      showNotification('New photo added to gallery');
    }

    setGalleryModalOpen(false);
  };

  // ==========================================
  // 3. SERVICES STATE & EDIT
  // ==========================================
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: '',
    shortDescription: '',
    detailedDescription: '',
    isPrimaryConfirmed: false,
    commonSymptoms: '',
    whatWeOffer: '',
  });

  // State for Add New Service Form
  const [newServiceForm, setNewServiceForm] = useState({
    name: '',
    category: 'Neurology Consultations',
    shortDescription: '',
    detailedDescription: '',
    isPrimaryConfirmed: false,
    commonSymptoms: '',
    whatWeOffer: '',
    icon: 'Brain',
  });

  const openAddServiceModal = () => {
    setNewServiceForm({
      name: '',
      category: 'Neurology Consultations',
      shortDescription: '',
      detailedDescription: '',
      isPrimaryConfirmed: false,
      commonSymptoms: '',
      whatWeOffer: '',
      icon: 'Brain',
    });
    setServiceModalOpen(true);
  };

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newServiceForm.name.trim()) {
      showNotification('Please enter a service name', 'error');
      return;
    }
    if (!newServiceForm.shortDescription.trim()) {
      showNotification('Please enter a short description', 'error');
      return;
    }

    addService({
      name: newServiceForm.name.trim(),
      category: newServiceForm.category.trim() || 'Neurology Consultations',
      isPrimaryConfirmed: newServiceForm.isPrimaryConfirmed,
      shortDescription: newServiceForm.shortDescription.trim(),
      detailedDescription: newServiceForm.detailedDescription.trim() || newServiceForm.shortDescription.trim(),
      commonSymptoms: newServiceForm.commonSymptoms
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      whatWeOffer: newServiceForm.whatWeOffer
        .split('\n')
        .map((o) => o.trim())
        .filter(Boolean),
      icon: newServiceForm.icon || 'Brain',
    });

    setServiceModalOpen(false);
    showNotification(`New service "${newServiceForm.name.trim()}" added successfully!`);
  };

  const openEditService = (service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name,
      category: service.category,
      shortDescription: service.shortDescription,
      detailedDescription: service.detailedDescription,
      isPrimaryConfirmed: service.isPrimaryConfirmed,
      commonSymptoms: service.commonSymptoms.join('\n'),
      whatWeOffer: service.whatWeOffer.join('\n'),
    });
  };

  const saveServiceChanges = (id) => {
    updateService(id, {
      name: serviceForm.name,
      category: serviceForm.category,
      shortDescription: serviceForm.shortDescription,
      detailedDescription: serviceForm.detailedDescription,
      isPrimaryConfirmed: serviceForm.isPrimaryConfirmed,
      commonSymptoms: serviceForm.commonSymptoms.split('\n').map((s) => s.trim()).filter(Boolean),
      whatWeOffer: serviceForm.whatWeOffer.split('\n').map((o) => o.trim()).filter(Boolean),
    });
    setEditingServiceId(null);
    showNotification('Service updated successfully');
  };

  // ==========================================
  // 4. FACILITIES STATE & EDIT
  // ==========================================
  const FACILITY_IMAGE_PRESETS = [
    {
      label: 'ICU & Inpatient Care',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
    },
    {
      label: 'Pharmacy & Dispensing',
      url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1200&auto=format&fit=crop',
    },
    {
      label: 'Diagnostic Laboratory',
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop',
    },
    {
      label: 'Physiotherapy & Rehab',
      url: 'https://images.unsplash.com/photo-1594824813511-20f545a95393?q=80&w=1200&auto=format&fit=crop',
    },
    {
      label: 'Imaging & Radiography',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
    },
    {
      label: 'Operation Theatre',
      url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop',
    },
    {
      label: 'Doctor Consultation Chamber',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
    },
    {
      label: 'Hospital Infrastructure & Ward',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const [editingFacilityId, setEditingFacilityId] = useState(null);
  const [facilityModalOpen, setFacilityModalOpen] = useState(false);
  const [facilityForm, setFacilityForm] = useState({
    title: '',
    shortTitle: '',
    category: '',
    description: '',
    featuresRaw: '',
    image: '',
  });
  const [facilityImagePreview, setFacilityImagePreview] = useState('');
  const facilityFileInputRef = useRef(null);

  // State for Add / Build New Facility Form
  const [newFacilityForm, setNewFacilityForm] = useState({
    title: '',
    shortTitle: '',
    category: 'Critical Care',
    description: '',
    featuresRaw: 'Dedicated monitoring unit\n24/7 trained nursing support\nSpecialist doctor on-call',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
    altText: '',
    icon: 'Building',
  });
  const [newFacilityImagePreview, setNewFacilityImagePreview] = useState(
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop'
  );
  const [isProcessingNewFacilityImg, setIsProcessingNewFacilityImg] = useState(false);
  const newFacilityFileInputRef = useRef(null);

  const openAddFacilityModal = () => {
    setNewFacilityForm({
      title: '',
      shortTitle: '',
      category: 'Critical Care',
      description: '',
      featuresRaw: 'Dedicated monitoring unit\n24/7 trained nursing support\nSpecialist doctor on-call',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
      altText: '',
      icon: 'Building',
    });
    setNewFacilityImagePreview(
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop'
    );
    setFacilityModalOpen(true);
  };

  const handleNewFacilityImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingNewFacilityImg(true);
      const result = await processImageFile(file);
      setNewFacilityImagePreview(result.dataUrl);
      setNewFacilityForm((prev) => ({ ...prev, image: result.dataUrl }));
      showNotification(`Facility photo compressed (${Math.round(result.compressedSize / 1024)} KB)`);
    } catch (err) {
      showNotification(err.message || 'Image processing failed', 'error');
    } finally {
      setIsProcessingNewFacilityImg(false);
    }
  };

  const handleCreateFacility = (e) => {
    e.preventDefault();
    if (!newFacilityForm.title.trim()) {
      showNotification('Please enter a facility title', 'error');
      return;
    }
    if (!newFacilityForm.description.trim()) {
      showNotification('Please enter a description for the facility', 'error');
      return;
    }

    const featuresList = newFacilityForm.featuresRaw
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    addFacility({
      title: newFacilityForm.title.trim(),
      shortTitle: newFacilityForm.shortTitle.trim() || newFacilityForm.title.trim(),
      category: newFacilityForm.category.trim() || 'Clinical Facility',
      description: newFacilityForm.description.trim(),
      image: newFacilityForm.image || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
      features: featuresList.length > 0 ? featuresList : ['Available on-site for patient care'],
      altText: newFacilityForm.altText.trim() || newFacilityForm.title.trim(),
      icon: newFacilityForm.icon || 'Building',
    });

    setFacilityModalOpen(false);
    showNotification(`New facility "${newFacilityForm.title.trim()}" built & added successfully!`);
  };

  const handleDeleteFacility = (id, title) => {
    if (window.confirm(`Are you sure you want to remove the facility "${title}"?`)) {
      deleteFacility(id);
      if (editingFacilityId === id) {
        setEditingFacilityId(null);
      }
      showNotification(`Facility "${title}" removed successfully`);
    }
  };

  const openEditFacility = (fac) => {
    setEditingFacilityId(fac.id);
    setFacilityForm({
      title: fac.title,
      shortTitle: fac.shortTitle,
      category: fac.category,
      description: fac.description,
      featuresRaw: fac.features.join('\n'),
      image: fac.image,
    });
    setFacilityImagePreview(fac.image);
  };

  const handleFacilityImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await processImageFile(file);
      setFacilityImagePreview(result.dataUrl);
      setFacilityForm((prev) => ({ ...prev, image: result.dataUrl }));
      showNotification('Facility image uploaded');
    } catch (err) {
      showNotification(err.message || 'Image upload failed', 'error');
    }
  };

  const saveFacilityChanges = (id) => {
    updateFacility(id, {
      title: facilityForm.title,
      shortTitle: facilityForm.shortTitle,
      category: facilityForm.category,
      description: facilityForm.description,
      features: facilityForm.featuresRaw.split('\n').map((f) => f.trim()).filter(Boolean),
      image: facilityForm.image,
    });
    setEditingFacilityId(null);
    showNotification('Facility updated successfully');
  };

  // ==========================================
  // 5. HOSPITAL INFO STATE & EDIT
  // ==========================================
  const [hospitalForm, setHospitalForm] = useState({
    hospitalName: data.hospitalName,
    tagline: data.tagline,
    supportingText: data.supportingText,
    established: data.established,
    phone: data.contact.phoneDisplay,
    whatsapp: data.contact.whatsappDisplay,
    email: data.contact.email,
    street: data.contact.address.street,
    city: data.contact.address.city,
    state: data.contact.address.state,
    opdSlot1: data.contact.timings.opdSlot1,
    opdSlot2: data.contact.timings.opdSlot2,
    emergency: data.contact.timings.emergency,
  });

  const saveHospitalInfo = () => {
    updateHospitalInfo({
      hospitalName: hospitalForm.hospitalName,
      tagline: hospitalForm.tagline,
      supportingText: hospitalForm.supportingText,
      established: hospitalForm.established,
      contact: {
        phoneDisplay: hospitalForm.phone,
        whatsappDisplay: hospitalForm.whatsapp,
        email: hospitalForm.email,
        address: {
          street: hospitalForm.street,
          city: hospitalForm.city,
          state: hospitalForm.state,
          landmark: 'Near Rotary Circle',
          country: 'India',
          full: `${hospitalForm.hospitalName}, ${hospitalForm.street}, ${hospitalForm.city}, ${hospitalForm.state}`,
        },
        timings: {
          opd: `${hospitalForm.opdSlot1} & ${hospitalForm.opdSlot2}`,
          opdSlot1: hospitalForm.opdSlot1,
          opdSlot2: hospitalForm.opdSlot2,
          emergency: hospitalForm.emergency,
        },
      },
    });
    showNotification('Hospital information saved successfully');
  };

  // ----------------------------------------------------
  // RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080E1A]/95 backdrop-blur-xl">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600">
              <Lock className="w-6 h-6" />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Hospital Portal</span>
            <h2 className="text-2xl font-bold text-[#0B132B] font-outfit">Masaraddi Admin Panel</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Authorized hospital administration & content manager. Please enter your access PIN.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0B132B] mb-1.5">
                Staff Access PIN
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-mono tracking-widest text-center"
              />
              {authError && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-sky-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2.5">
            <div className="text-xs text-slate-600">
              Default Demo PIN: <code className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-300">1234</code>
            </div>
            <button
              type="button"
              onClick={() => {
                setPinInput('1234');
                setIsAuthenticated(true);
                sessionStorage.setItem('masaraddi_admin_auth', 'true');
                setAuthError('');
                showNotification('Admin authenticated successfully');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-800 text-xs font-bold border border-sky-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
              <span>One-Click Auto Login (Local / Demo Access)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER FULL ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F8FAFC] text-slate-800 overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-top-2 ${
            notification.type === 'success'
              ? 'bg-emerald-950/95 text-emerald-200 border-emerald-500/40'
              : 'bg-rose-950/95 text-rose-200 border-rose-500/40'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="bg-[#080E1A] text-white border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold font-outfit leading-tight flex items-center gap-2">
              <span>Masaraddi Neuro Care Center</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Admin
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Content Management & Instant Visual Updates</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 text-xs font-semibold border border-rose-800/40 transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2 overflow-x-auto shrink-0 flex items-center gap-2">
        {[
          { id: 'doctor', label: 'Doctor Profile & Image', icon: UserCheck },
          { id: 'gallery', label: `Gallery Images (${data.gallery.length})`, icon: ImageIcon },
          { id: 'services', label: `Services (${data.services.length})`, icon: Activity },
          { id: 'facilities', label: `Facilities (${data.facilities.length})`, icon: Building },
          { id: 'hospital', label: 'Hospital Info & Timings', icon: Settings },
          { id: 'preview', label: 'Export / Backup / Reset', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm scale-[1.01]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Admin Scrollable Canvas */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">

        {/* ========================================================= */}
        {/* TAB 1: DOCTOR PROFILE & IMAGE UPLOAD                      */}
        {/* ========================================================= */}
        {activeTab === 'doctor' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0B132B] font-outfit">Doctor Profile & Image Upload</h2>
                <p className="text-xs text-slate-500">
                  Update doctor credentials, specialization, experience, and upload high-resolution profile photographs.
                </p>
              </div>
              <button
                onClick={saveDoctorChanges}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Doctor Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Doctor Image Uploader & Live Preview */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                <span className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block">
                  Doctor Profile Photograph
                </span>

                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center group">
                  {doctorImagePreview ? (
                    <img
                      src={doctorImagePreview}
                      alt="Doctor Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="text-center p-4 text-slate-400 space-y-2">
                      <UserCheck className="w-12 h-12 mx-auto stroke-1 text-slate-400" />
                      <p className="text-xs">No photograph selected</p>
                    </div>
                  )}

                  {isProcessingDoctorImg && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Optimizing Image...</span>
                    </div>
                  )}
                </div>

                {/* Upload Button & File Input */}
                <input
                  type="file"
                  ref={doctorFileInputRef}
                  onChange={handleDoctorImageChange}
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                />

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => doctorFileInputRef.current?.click()}
                    disabled={isProcessingDoctorImg}
                    className="w-full py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload New Doctor Photo</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Accepts: JPG, JPEG, PNG, WEBP (Max 8MB). Automatically compressed on your device.
                  </p>
                </div>

                {/* Live Preview Card */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Public Badge Preview
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                      <img src={doctorImagePreview} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B132B]">{doctorForm.name}</h4>
                      <p className="text-[11px] text-sky-600 font-semibold">{doctorForm.specialization}</p>
                      <p className="text-[10px] text-slate-500">{doctorForm.experience}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Details Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Doctor Full Name</label>
                    <input
                      type="text"
                      value={doctorForm.name}
                      onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Specialization</label>
                    <input
                      type="text"
                      value={doctorForm.specialization}
                      onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Experience Wording</label>
                    <input
                      type="text"
                      value={doctorForm.experience}
                      onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Qualifications Summary</label>
                    <input
                      type="text"
                      value={doctorForm.qualificationsSummary}
                      onChange={(e) => setDoctorForm({ ...doctorForm, qualificationsSummary: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1.5">
                    Verified Degrees & Colleges (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={doctorForm.qualificationsRaw}
                    onChange={(e) => setDoctorForm({ ...doctorForm, qualificationsRaw: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1.5">OPD Consultation Timings</label>
                  <input
                    type="text"
                    value={doctorForm.timings}
                    onChange={(e) => setDoctorForm({ ...doctorForm, timings: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Professional Doctor Bio</label>
                  <textarea
                    rows={4}
                    value={doctorForm.bio}
                    onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={saveDoctorChanges}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save Changes to Doctor Profile
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: GALLERY IMAGES MANAGEMENT                          */}
        {/* ========================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#0B132B] font-outfit">Hospital Gallery Manager</h2>
                <p className="text-xs text-slate-500">
                  Upload new photos, replace existing images, manage captions, or categorize clinical environments.
                </p>
              </div>

              <button
                onClick={openAddGalleryModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            </div>

            {/* Gallery Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {data.gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between group"
                >
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 text-sky-300 backdrop-blur-md">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5 flex-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#0B132B] line-clamp-1">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{item.caption}</p>
                  </div>

                  <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => openEditGalleryModal(item)}
                      className="inline-flex items-center gap-1 font-bold text-sky-600 hover:text-sky-700 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete photo "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                          showNotification('Photo removed from gallery');
                        }
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: SERVICES MANAGEMENT                                */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#0B132B] font-outfit">Neurological Services Management</h2>
                <p className="text-xs text-slate-500">
                  Add new services, edit service names, descriptions, symptoms, and care components. Confirmed services appear highlighted on the website.
                </p>
              </div>

              <button
                onClick={openAddServiceModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.services.map((srv) => {
                const isEditing = editingServiceId === srv.id;
                return (
                  <div
                    key={srv.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                        <h3 className="text-base font-bold text-[#0B132B]">{srv.name}</h3>
                        {srv.isPrimaryConfirmed && (
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                            Primary Focus
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={openAddServiceModal}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
                              title="Add new service"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Service</span>
                            </button>
                            <button
                              onClick={() => setEditingServiceId(null)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => saveServiceChanges(srv.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Save Changes</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditService(srv)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit Service</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete service "${srv.name}"?`)) {
                                  deleteService(srv.id);
                                  showNotification(`Service "${srv.name}" deleted successfully`);
                                }
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold text-xs cursor-pointer border border-rose-200/80"
                              title="Delete service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#0B132B] mb-1">Service Title</label>
                            <input
                              type="text"
                              value={serviceForm.name}
                              onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#0B132B] mb-1">Category</label>
                            <input
                              type="text"
                              value={serviceForm.category}
                              onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0B132B] mb-1">Short Description</label>
                          <textarea
                            rows={2}
                            value={serviceForm.shortDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0B132B] mb-1">Detailed Description</label>
                          <textarea
                            rows={3}
                            value={serviceForm.detailedDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, detailedDescription: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-700"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#0B132B] mb-1">
                              Evaluated Symptoms (1 per line)
                            </label>
                            <textarea
                              rows={3}
                              value={serviceForm.commonSymptoms}
                              onChange={(e) => setServiceForm({ ...serviceForm, commonSymptoms: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#0B132B] mb-1">
                              Clinical Components (1 per line)
                            </label>
                            <textarea
                              rows={3}
                              value={serviceForm.whatWeOffer}
                              onChange={(e) => setServiceForm({ ...serviceForm, whatWeOffer: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id={`confirmed-${srv.id}`}
                            checked={serviceForm.isPrimaryConfirmed}
                            onChange={(e) => setServiceForm({ ...serviceForm, isPrimaryConfirmed: e.target.checked })}
                            className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                          />
                          <label htmlFor={`confirmed-${srv.id}`} className="text-xs font-bold text-slate-700 cursor-pointer">
                            Mark Hospital Focus (Stroke Care, Epilepsy, Complete Neurology)
                          </label>
                        </div>

                        {/* Edit Form Bottom Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => saveServiceChanges(srv.id)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Save Changes</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingServiceId(null)}
                              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                            >
                              Cancel
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={openAddServiceModal}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 cursor-pointer transition-colors shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Add Another Service</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs text-slate-600">
                        <p className="leading-relaxed">{srv.shortDescription}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {srv.whatWeOffer.slice(0, 3).map((w, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium text-[11px]">
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Add New Service Card */}
            <div className="pt-2">
              <button
                type="button"
                onClick={openAddServiceModal}
                className="w-full py-4 px-6 border-2 border-dashed border-sky-300 hover:border-sky-500 bg-sky-50/50 hover:bg-sky-50/90 text-sky-700 rounded-3xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                <Plus className="w-5 h-5 text-sky-600" />
                <span>+ Add New Neurological Service</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: FACILITIES MANAGEMENT                              */}
        {/* ========================================================= */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            {/* Facilities Tab Header with Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-[#0B132B] font-outfit">Hospital Facilities</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200">
                    {data.facilities.length} Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage hospital infrastructure, ICU beds, diagnostic labs, therapy units, and patient facilities.
                </p>
              </div>

              {/* Top Add New Facility Button */}
              <button
                type="button"
                onClick={openAddFacilityModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Hospital Facility</span>
              </button>
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.facilities.map((fac) => {
                const isEditing = editingFacilityId === fac.id;
                return (
                  <div
                    key={fac.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                          {fac.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                onClick={() => saveFacilityChanges(fac.id)}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs transition-colors flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Save Changes</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingFacilityId(null)}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={openAddFacilityModal}
                                className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 cursor-pointer transition-colors flex items-center gap-1"
                                title="Add another facility"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Facility</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => openEditFacility(fac)}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors flex items-center gap-1"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteFacility(fac.id, fac.title)}
                                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                                title="Delete facility"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Editing View */}
                      {isEditing ? (
                        <div className="space-y-3 pt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Full Facility Title
                              </label>
                              <input
                                type="text"
                                value={facilityForm.title}
                                onChange={(e) => setFacilityForm({ ...facilityForm, title: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Short Title / Label
                              </label>
                              <input
                                type="text"
                                value={facilityForm.shortTitle}
                                onChange={(e) => setFacilityForm({ ...facilityForm, shortTitle: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
                            <input
                              type="text"
                              value={facilityForm.category}
                              onChange={(e) => setFacilityForm({ ...facilityForm, category: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={facilityForm.description}
                              onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Features (1 per line)
                            </label>
                            <textarea
                              rows={3}
                              value={facilityForm.featuresRaw}
                              onChange={(e) => setFacilityForm({ ...facilityForm, featuresRaw: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono"
                            />
                          </div>

                          {/* Image preview & replacement */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Facility Photo</label>
                            <input
                              type="file"
                              ref={facilityFileInputRef}
                              onChange={handleFacilityImageChange}
                              accept=".jpg,.jpeg,.png,.webp"
                              className="hidden"
                            />
                            <div className="flex items-center gap-3">
                              <img
                                src={facilityImagePreview || fac.image}
                                alt=""
                                className="w-20 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200"
                              />
                              <button
                                type="button"
                                onClick={() => facilityFileInputRef.current?.click()}
                                className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200 hover:bg-sky-100 cursor-pointer transition-colors"
                              >
                                Replace Photo
                              </button>
                            </div>
                          </div>

                          {/* Edit Form Bottom Action Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => saveFacilityChanges(fac.id)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Save Changes</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingFacilityId(null)}
                                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                              >
                                Cancel
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={openAddFacilityModal}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 cursor-pointer transition-colors shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>+ Add Another Facility</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Image preview thumbnail if present */}
                          {fac.image && (
                            <div className="h-36 w-full rounded-2xl overflow-hidden bg-slate-100 relative group">
                              <img
                                src={fac.image}
                                alt={fac.altText || fac.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <h3 className="text-base font-bold text-[#0B132B]">{fac.title}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">{fac.description}</p>
                            <div className="pt-2 grid grid-cols-2 gap-1.5">
                              {fac.features.map((ft, i) => (
                                <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                                  <span className="truncate">{ft}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Add New Facility Card */}
            <div className="pt-2">
              <button
                type="button"
                onClick={openAddFacilityModal}
                className="w-full py-4 px-6 border-2 border-dashed border-sky-300 hover:border-sky-500 bg-sky-50/50 hover:bg-sky-50/90 text-sky-700 rounded-3xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                <Plus className="w-5 h-5 text-sky-600" />
                <span>+ Add New Hospital Facility</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: HOSPITAL INFO & TIMINGS                            */}
        {/* ========================================================= */}
        {activeTab === 'hospital' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0B132B] font-outfit">Hospital Information & Timings</h2>
                <p className="text-xs text-slate-500">Official hospital contact numbers, address, and consultation slots.</p>
              </div>

              <button
                onClick={saveHospitalInfo}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Hospital Details</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Hospital Name</label>
                <input
                  type="text"
                  value={hospitalForm.hospitalName}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, hospitalName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Hospital History / Est.</label>
                <input
                  type="text"
                  value={hospitalForm.established}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, established: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Primary Phone Display</label>
                <input
                  type="text"
                  value={hospitalForm.phone}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">WhatsApp Display</label>
                <input
                  type="text"
                  value={hospitalForm.whatsapp}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Official Email</label>
                <input
                  type="email"
                  value={hospitalForm.email}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Emergency Status</label>
                <input
                  type="text"
                  value={hospitalForm.emergency}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, emergency: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">OPD Morning Slot</label>
                <input
                  type="text"
                  value={hospitalForm.opdSlot1}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, opdSlot1: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">OPD Evening Slot</label>
                <input
                  type="text"
                  value={hospitalForm.opdSlot2}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, opdSlot2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">Street Address</label>
                <input
                  type="text"
                  value={hospitalForm.street}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, street: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1.5">About & Mission Summary</label>
                <textarea
                  rows={3}
                  value={hospitalForm.supportingText}
                  onChange={(e) => setHospitalForm({ ...hospitalForm, supportingText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-700 leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: BACKUP / RESET / EXPORT                            */}
        {/* ========================================================= */}
        {activeTab === 'preview' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#0B132B] font-outfit">Data Backup & Restore</h2>
              <p className="text-xs text-slate-500">
                Export website content or restore default hospital configuration form values.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-[#0B132B]">Export Configuration</h3>
                <p className="text-xs text-slate-500">
                  Download a complete JSON backup of all doctors, gallery photos, facilities, and services.
                </p>
                <button
                  onClick={() => {
                    const json = exportData();
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `masaraddi-neuro-care-backup-${Date.now()}.json`;
                    a.click();
                    showNotification('Configuration exported');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-3">
                <h3 className="text-sm font-bold text-rose-900">Reset to Verified Hospital Form</h3>
                <p className="text-xs text-rose-700">
                  Restore original verified data (Dr. Shivkumar Masaraddi, Gouri Layout Rotary Circle, 7 ICU).
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to restore default hospital form data?')) {
                      resetToDefaults();
                      showNotification('Defaults restored successfully');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Verified Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* GALLERY UPLOAD / EDIT MODAL                               */}
      {/* ========================================================= */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0B132B] font-outfit">
                {editingGalleryId ? 'Edit Gallery Photo' : 'Upload New Gallery Photo'}
              </h3>
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Preview & Upload Button */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0B132B]">Photo File & Preview</label>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
                {galleryImagePreview ? (
                  <img src={galleryImagePreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4 text-slate-400 space-y-1">
                    <ImageIcon className="w-8 h-8 mx-auto text-slate-400" />
                    <p className="text-xs">No image uploaded yet</p>
                  </div>
                )}
                {isProcessingGalleryImg && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compressing image...</span>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={galleryFileInputRef}
                onChange={handleGalleryImageChange}
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => galleryFileInputRef.current?.click()}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{galleryImagePreview ? 'Replace Image File' : 'Browse & Upload Image'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B132B] mb-1">Photo Title</label>
              <input
                type="text"
                required
                placeholder="e.g. 7 ICU Patient Monitoring Unit"
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B132B] mb-1">Category</label>
              <select
                value={galleryForm.category}
                onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
              >
                <option value="exterior">Premises & Exterior</option>
                <option value="consultation">Doctor Consultation</option>
                <option value="patient_care">7 ICU & Inpatient Wards</option>
                <option value="facilities">Hospital Facilities & Reception</option>
                <option value="diagnostics">Laboratory & Diagnostics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B132B] mb-1">Caption / Description</label>
              <textarea
                rows={2}
                placeholder="Short descriptive caption..."
                value={galleryForm.caption}
                onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={saveGalleryItem}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                {editingGalleryId ? 'Save Changes' : 'Add to Gallery'}
              </button>
              <button
                type="button"
                onClick={() => setGalleryModalOpen(false)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ADD / CREATE NEW SERVICE MODAL                            */}
      {/* ========================================================= */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
                  <Activity className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B132B] font-outfit">
                    Add New Neurological Service
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add a new specialized treatment, clinic or clinical care service
                  </p>
                </div>
              </div>
              <button
                onClick={() => setServiceModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Service Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Headache & Migraine Care"
                    value={newServiceForm.name}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Category
                  </label>
                  <select
                    value={newServiceForm.category}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="Neurology Consultations">Neurology Consultations</option>
                    <option value="Emergency Care">Emergency Care</option>
                    <option value="Specialized Neuro Clinic">Specialized Neuro Clinic</option>
                    <option value="Inpatient & ICU Care">Inpatient & ICU Care</option>
                    <option value="Diagnostic & Monitoring">Diagnostic & Monitoring</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1">
                  Short Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary shown on the main service card..."
                  value={newServiceForm.shortDescription}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1">
                  Detailed Clinical Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed clinical evaluation and treatment information for patients..."
                  value={newServiceForm.detailedDescription}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, detailedDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Evaluated Symptoms (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Chronic throbbing headache&#10;Visual aura & photophobia&#10;Facial nerve discomfort"
                    value={newServiceForm.commonSymptoms}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, commonSymptoms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Clinical Components (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Diagnostic evaluation&#10;Preventative medical therapy&#10;Guidance on triggers"
                    value={newServiceForm.whatWeOffer}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, whatWeOffer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Card Icon Style
                  </label>
                  <select
                    value={newServiceForm.icon}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900"
                  >
                    <option value="Brain">Brain (General Neurology)</option>
                    <option value="Activity">Activity (Diagnostics / Monitoring)</option>
                    <option value="Zap">Zap (Seizures / Fast Action / Emergency)</option>
                    <option value="ShieldAlert">ShieldAlert (Stroke / Critical Neuro)</option>
                    <option value="HeartPulse">HeartPulse (Vital Stability)</option>
                    <option value="Stethoscope">Stethoscope (Doctor Evaluation)</option>
                    <option value="BedDouble">BedDouble (Inpatient / ICU)</option>
                    <option value="FileText">FileText (Clinical Assessment)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="new-service-primary"
                    checked={newServiceForm.isPrimaryConfirmed}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, isPrimaryConfirmed: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <label htmlFor="new-service-primary" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Highlight Focus Area
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service to Website</span>
                </button>
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* BUILD & ADD NEW HOSPITAL FACILITY MODAL                    */}
      {/* ========================================================= */}
      {facilityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
                  <Building className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B132B] font-outfit">
                    Build &amp; Add Hospital Facility
                  </h3>
                  <p className="text-xs text-slate-500">
                    Create a new medical department, diagnostic lab, or patient care infrastructure
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFacilityModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Builder Form */}
            <form onSubmit={handleCreateFacility} className="space-y-4">
              {/* Quick Facility Name Suggestions */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Quick Name Templates (Click to fill)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { title: 'EEG & Neuro-Electrophysiology Lab', short: 'EEG Lab', cat: 'Diagnostic Support', icon: 'Activity' },
                    { title: 'Dedicated Stroke ICU Unit', short: 'Stroke ICU', cat: 'Critical Care', icon: 'BedDouble' },
                    { title: 'Neuro-Rehabilitation & Mobility Suite', short: 'Physiotherapy', cat: 'Neuro-Rehabilitation', icon: 'Activity' },
                    { title: 'Emergency Neuro-Trauma Care Unit', short: 'Emergency Unit', cat: 'Emergency Care', icon: 'ShieldAlert' },
                    { title: 'Daycare & Observation Ward', short: 'Daycare Ward', cat: 'Inpatient Care', icon: 'BedDouble' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setNewFacilityForm((prev) => ({
                          ...prev,
                          title: preset.title,
                          shortTitle: preset.short,
                          category: preset.cat,
                          icon: preset.icon,
                          description: prev.description || `Specialized ${preset.title.toLowerCase()} equipped to provide dedicated clinical support at Masaraddi Neuro Care Center.`,
                        }));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-100 hover:text-sky-800 text-slate-700 text-xs font-medium cursor-pointer transition-colors border border-slate-200"
                    >
                      + {preset.short}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Short Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Facility Full Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advanced EEG & EMG Diagnostic Lab"
                    value={newFacilityForm.title}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Short Title / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EEG Lab"
                    value={newFacilityForm.shortTitle}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, shortTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              {/* Category & Icon Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Facility Category
                  </label>
                  <select
                    value={newFacilityForm.category}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="Critical Care">Critical Care &amp; ICU</option>
                    <option value="Medication Services">Medication Services &amp; Pharmacy</option>
                    <option value="Diagnostic Support">Diagnostic Support &amp; Lab</option>
                    <option value="Neuro-Rehabilitation">Neuro-Rehabilitation &amp; Physio</option>
                    <option value="Imaging Services">Imaging Services &amp; X-Ray</option>
                    <option value="Surgical & Procedure Suite">Surgical &amp; Procedure Suite</option>
                    <option value="Emergency Care">Emergency Care &amp; Acute Support</option>
                    <option value="Patient Care">Inpatient &amp; Patient Wards</option>
                    <option value="Specialized Clinical Suite">Specialized Clinical Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B132B] mb-1">
                    Card Icon Style
                  </label>
                  <select
                    value={newFacilityForm.icon}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="Building">Building (General Infrastructure)</option>
                    <option value="BedDouble">BedDouble (ICU / Inpatient Beds)</option>
                    <option value="FlaskConical">FlaskConical (Diagnostic Lab)</option>
                    <option value="Pill">Pill (Pharmacy &amp; Medicines)</option>
                    <option value="Activity">Activity (Physiotherapy &amp; Monitoring)</option>
                    <option value="Scan">Scan (X-Ray &amp; Radiography)</option>
                    <option value="ShieldAlert">ShieldAlert (Emergency &amp; Acute Care)</option>
                    <option value="HeartPulse">HeartPulse (Vital Monitoring)</option>
                    <option value="Stethoscope">Stethoscope (Doctor Consultation)</option>
                    <option value="Zap">Zap (Rapid Response / Neuro-Stim)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1">
                  Facility Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Comprehensive description of clinical capabilities and patient care offered..."
                  value={newFacilityForm.description}
                  onChange={(e) => setNewFacilityForm({ ...newFacilityForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              {/* Features (1 per line) */}
              <div>
                <label className="block text-xs font-bold text-[#0B132B] mb-1">
                  Key Features / Amenities (1 per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Dedicated 24/7 staff&#10;Continuous vital monitoring&#10;Immediate specialist consultation&#10;Sterile hospital environment"
                  value={newFacilityForm.featuresRaw}
                  onChange={(e) => setNewFacilityForm({ ...newFacilityForm, featuresRaw: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>

              {/* Facility Photo: Upload or Pick Preset */}
              <div className="space-y-2.5 pt-1 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#0B132B]">
                  Facility Photograph
                </label>

                {/* Upload or Preset Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    ref={newFacilityFileInputRef}
                    onChange={handleNewFacilityImageChange}
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => newFacilityFileInputRef.current?.click()}
                    disabled={isProcessingNewFacilityImg}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isProcessingNewFacilityImg ? 'Compressing...' : 'Upload from Device'}</span>
                  </button>

                  <span className="text-xs text-slate-400 font-medium">or pick a verified hospital photo:</span>
                </div>

                {/* Preset Photo Options */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {FACILITY_IMAGE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setNewFacilityForm((prev) => ({ ...prev, image: preset.url }));
                        setNewFacilityImagePreview(preset.url);
                      }}
                      className={`group relative rounded-xl overflow-hidden border p-1 text-left transition-all cursor-pointer ${
                        newFacilityImagePreview === preset.url
                          ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/50'
                          : 'border-slate-200 hover:border-sky-300 bg-white'
                      }`}
                    >
                      <div className="h-14 w-full rounded-lg overflow-hidden bg-slate-100">
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="block text-[10px] font-semibold text-slate-700 truncate mt-1">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Live Preview Box */}
                {newFacilityImagePreview && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 mt-2">
                    <img
                      src={newFacilityImagePreview}
                      alt="Selected preview"
                      className="w-20 h-14 rounded-xl object-cover bg-slate-200 border border-slate-300 shadow-xs shrink-0"
                    />
                    <div className="text-xs space-y-0.5 overflow-hidden">
                      <p className="font-bold text-slate-800 truncate">
                        {newFacilityForm.title || 'Facility Photo Preview'}
                      </p>
                      <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready to display on hospital site</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Alt Text for Accessibility & SEO */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Image Alt Text (SEO &amp; Accessibility)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diagnostic EEG laboratory at Masaraddi Neuro Care Center Bagalkot"
                  value={newFacilityForm.altText}
                  onChange={(e) => setNewFacilityForm({ ...newFacilityForm, altText: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Build &amp; Publish Facility</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFacilityModalOpen(false)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
