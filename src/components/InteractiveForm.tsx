'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

interface FormData {
  nombre: string;
  email: string;
  telefono?: string;
  tipoServicio: string;
  // Estructuras Metálicas
  areaEstructura?: string;
  numeroPisos?: string;
  ciudad?: string;
  barrio?: string;
  estrato?: string;
  tienePlanimetria?: string;
  peticionesAdicionales?: string;
  // Diseño Arquitectónico
  tipoServicioArquitectura?: string;
  incluirEstudioSuelos?: string;
  incluirPlanosHidrosanitarios?: string;
  usoProyecto?: string;
  areaLote?: string;
  // Planimetría
  cotizacionConcreto?: string;
}

interface Question {
  id: number;
  question: string;
  field: keyof FormData;
  type: "text" | "email" | "tel" | "select" | "textarea";
  validation?: {
    required?: string | boolean;
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
  options?: string[];
  showIf?: (data: FormData) => boolean;
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuál es tu nombre?",
    field: "nombre",
    type: "text",
    validation: { 
      required: "El nombre es requerido",
      minLength: {
        value: 2,
        message: "El nombre debe tener al menos 2 caracteres"
      }
    }
  },
  {
    id: 2,
    question: "¿Cuál es tu correo electrónico?",
    field: "email",
    type: "email",
    validation: {
      required: "El email es requerido",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email inválido"
      }
    }
  },
  {
    id: 3,
    question: "¿Cuál es tu número de teléfono?",
    field: "telefono",
    type: "tel",
    validation: {
      pattern: {
        value: /^[0-9+\s-]{8,}$/,
        message: "Número de teléfono inválido"
      }
    }
  },
  {
    id: 4,
    question: "¿Qué servicio te interesa?",
    field: "tipoServicio",
    type: "select",
    options: ["Estructuras Metálicas", "Diseño Arquitectónico", "Planimetría"],
    validation: { required: "Por favor selecciona un tipo de servicio" }
  },
  // Preguntas específicas para Estructuras Metálicas
  {
    id: 5,
    question: "¿Cuál es el área de la estructura a construir? (en m² o dimensiones)",
    field: "areaEstructura",
    type: "text",
    validation: { required: "El área es requerida" },
    showIf: (data) => data.tipoServicio === "Estructuras Metálicas"
  },
  {
    id: 6,
    question: "¿Cuántos pisos desea construir?",
    field: "numeroPisos",
    type: "text",
    validation: { required: "El número de pisos es requerido" },
    showIf: (data) => data.tipoServicio === "Estructuras Metálicas"
  },
  {
    id: 7,
    question: "¿En qué ciudad o municipio se realizará la obra?",
    field: "ciudad",
    type: "text",
    validation: { required: "La ciudad es requerida" },
    showIf: (data) => data.tipoServicio === "Estructuras Metálicas"
  },
  {
    id: 8,
    question: "Si es en Bogotá, ¿en qué barrio se ubica el proyecto?",
    field: "barrio",
    type: "text",
    showIf: (data) => data.tipoServicio === "Estructuras Metálicas" && (data.ciudad?.toLowerCase().includes("bogota") ?? false)
  },
  {
    id: 9,
    question: "¿Qué estrato socioeconómico tiene la zona del proyecto?",
    field: "estrato",
    type: "select",
    options: ["1", "2", "3", "4", "5", "6", "No sabe", "Ninguno"],
    validation: { required: "El estrato es requerido" },
    showIf: (data) => data.tipoServicio === "Estructuras Metálicas"
  },
  {
    id: 10,
    question: "¿Cuenta con planimetría del proyecto?",
    field: "tienePlanimetria",
    type: "select",
    options: ["Sí", "No"],
    validation: { required: "Esta información es requerida" },
    showIf: (data) => data.tipoServicio === "Estructuras Metálicas"
  },
  {
    id: 11,
    question: "¿Tiene alguna petición adicional que debamos tener en cuenta?",
    field: "peticionesAdicionales",
    type: "textarea",
    showIf: (data) => data.tipoServicio === "Estructuras Metálicas"
  },
  // Preguntas específicas para Diseño Arquitectónico
  {
    id: 12,
    question: "¿A cuál de nuestros servicios desea acceder?",
    field: "tipoServicioArquitectura",
    type: "select",
    options: [
      "Paquete técnico completo (Licencia, diseño arquitectónico y cálculo estructural)",
      "Solo licencia",
      "Solo diseño arquitectónico y cálculo estructural"
    ],
    validation: { required: "Por favor selecciona un tipo de servicio" },
    showIf: (data) => data.tipoServicio === "Diseño Arquitectónico"
  },
  {
    id: 13,
    question: "¿Desea incluir el estudio de suelos en los cálculos estructurales?",
    field: "incluirEstudioSuelos",
    type: "select",
    options: ["Sí", "No"],
    validation: { required: "Esta información es requerida" },
    showIf: (data) => data.tipoServicio === "Diseño Arquitectónico"
  },
  {
    id: 14,
    question: "¿Desea planos hidrosanitarios y eléctricos en el diseño?",
    field: "incluirPlanosHidrosanitarios",
    type: "select",
    options: ["Sí", "No"],
    validation: { required: "Esta información es requerida" },
    showIf: (data) => data.tipoServicio === "Diseño Arquitectónico"
  },
  {
    id: 15,
    question: "¿Cuál será el uso del proyecto?",
    field: "usoProyecto",
    type: "select",
    options: ["Casa", "Apartamentos", "Bodega", "Comercio", "Otro"],
    validation: { required: "El uso del proyecto es requerido" },
    showIf: (data) => data.tipoServicio === "Diseño Arquitectónico"
  },
  {
    id: 16,
    question: "¿Cuántos pisos desea construir?",
    field: "numeroPisos",
    type: "text",
    validation: { required: "El número de pisos es requerido" },
    showIf: (data) => data.tipoServicio === "Diseño Arquitectónico"
  },
  {
    id: 17,
    question: "¿Cuál es el área o dimensiones del lote (especialmente del primer piso)?",
    field: "areaLote",
    type: "text",
    validation: { required: "El área del lote es requerida" },
    showIf: (data) => data.tipoServicio === "Diseño Arquitectónico"
  },
  // Preguntas específicas para Planimetría
  {
    id: 18,
    question: "¿En qué ciudad o municipio se ubica el proyecto?",
    field: "ciudad",
    type: "text",
    validation: { required: "La ciudad es requerida" },
    showIf: (data) => data.tipoServicio === "Planimetría"
  },
  {
    id: 19,
    question: "Si es en Bogotá, ¿en qué barrio se encuentra?",
    field: "barrio",
    type: "text",
    showIf: (data) => data.tipoServicio === "Planimetría" && (data.ciudad?.toLowerCase().includes("bogota") ?? false)
  },
  {
    id: 20,
    question: "¿Qué estrato socioeconómico tiene la zona?",
    field: "estrato",
    type: "select",
    options: ["1", "2", "3", "4", "5", "6", "No sabe", "Ninguno"],
    validation: { required: "El estrato es requerido" },
    showIf: (data) => data.tipoServicio === "Planimetría"
  },
  {
    id: 21,
    question: "¿Le gustaría recibir también una cotización para estructura en concreto?",
    field: "cotizacionConcreto",
    type: "select",
    options: ["Sí", "No"],
    validation: { required: "Esta información es requerida" },
    showIf: (data) => data.tipoServicio === "Planimetría"
  }
];

interface InteractiveFormProps {
  initialService?: string;
}

const InteractiveForm = ({ initialService }: InteractiveFormProps) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<FormData>({
    defaultValues: {
      tipoServicio: initialService
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const formData = watch();

  const getVisibleQuestions = () => {
    return questions.filter(question => {
      if (initialService && question.field === 'tipoServicio') return false;
      if (!question.showIf) return true;
      return question.showIf(formData) ?? false;
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[step - 1];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Enviar a Google Sheets
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Enviar email de notificación
      console.log('EmailJS Config:', {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      });

      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: data.nombre,
            from_email: data.email,
            message: `
              Nuevo formulario recibido:
              Nombre: ${data.nombre}
              Email: ${data.email}
              Teléfono: ${data.telefono || 'No proporcionado'}
              Tipo de Servicio: ${data.tipoServicio}
              ${data.tipoServicio === 'Estructuras Metálicas' ? `
              Área de Estructura: ${data.areaEstructura}
              Número de Pisos: ${data.numeroPisos}
              Ciudad: ${data.ciudad}
              Barrio: ${data.barrio || 'No aplica'}
              Estrato: ${data.estrato}
              Tiene Planimetría: ${data.tienePlanimetria}
              Peticiones Adicionales: ${data.peticionesAdicionales || 'No hay'}
              ` : ''}
              ${data.tipoServicio === 'Diseño Arquitectónico' ? `
              Tipo de Servicio: ${data.tipoServicioArquitectura}
              Incluir Estudio de Suelos: ${data.incluirEstudioSuelos}
              Incluir Planos Hidrosanitarios: ${data.incluirPlanosHidrosanitarios}
              Uso del Proyecto: ${data.usoProyecto}
              Número de Pisos: ${data.numeroPisos}
              Área del Lote: ${data.areaLote}
              ` : ''}
              ${data.tipoServicio === 'Planimetría' ? `
              Ciudad: ${data.ciudad}
              Barrio: ${data.barrio || 'No aplica'}
              Estrato: ${data.estrato}
              Cotización Concreto: ${data.cotizacionConcreto}
              ` : ''}
            `,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
      } catch (error) {
        console.error('Error detallado de EmailJS:', error);
        throw error;
      }

      setFormSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const currentField = currentQuestion.field;
    const isValid = await trigger(currentField as keyof FormData);
    if (isValid) {
      setStep(step + 1);
    }
  };

  if (formSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-green-600 mb-4">¡Formulario enviado con éxito!</h2>
              <p className="text-gray-600">Gracias por tu interés. Nos pondremos en contacto contigo pronto.</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentQuestion.question}
                {currentQuestion.validation?.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h2>

              {currentQuestion.type === "select" ? (
                <select
                  {...register(currentQuestion.field as keyof FormData, currentQuestion.validation)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors[currentQuestion.field as keyof FormData] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecciona una opción</option>
                  {currentQuestion.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : currentQuestion.type === "textarea" ? (
                <textarea
                  {...register(currentQuestion.field as keyof FormData, currentQuestion.validation)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors[currentQuestion.field as keyof FormData] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                />
              ) : (
                <input
                  type={currentQuestion.type}
                  {...register(currentQuestion.field as keyof FormData, currentQuestion.validation)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors[currentQuestion.field as keyof FormData] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={`Ingresa tu ${currentQuestion.field}`}
                />
              )}

              {errors[currentQuestion.field as keyof FormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[currentQuestion.field as keyof FormData]?.message}
                </p>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Anterior
                  </button>
                )}
                
                {step < visibleQuestions.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            {visibleQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index + 1 === step ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default InteractiveForm; 