'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ServiceModal from '@/components/ServiceModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <main className="bg-black min-h-screen font-sans text-white">
      {/* Encabezado principal */}
    
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-4 items-center">
        <div>
        <div className="flex justify-center items-center mb-8">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={300} 
          height={300} 
          className="w-72 h-72 object-contain" 
        />
      </div>
      
         
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Construimos tus ideas<br />con precisión e innovación
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Servicios profesionales en estructuras metálicas, diseño arquitectónico y <br />
            consultoría especializada para proyectos exigentes.
          </p>
          <button 
            onClick={() => handleServiceClick('')}
            className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            Solicita tu cotización personalizada
          </button>
          <div className="flex justify-center items-center mb-8">
        <video 
          src="/video.mp4"  
          className="mt-10 w-full max-w-md aspect-video object-cover rounded-lg shadow-lg border border-gray-700" 
          controls 
          poster="/smart.png"
        />
      </div>
        </div>
        <div className="flex flex-col items-center">
          {/* Placeholder para Video 1 */}
          <div className="w-full aspect-[9/16] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-xl mb-2">
            <video src="/pauta.mov" autoPlay muted loop className="w-full h-full object-cover rounded-lg" />
          </div>
          <p className="text-center text-gray-400 mt-2">¿Por qué elegir Smart Construcción?</p>
        </div>
      </section>

      {/* Sección de servicios */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-white">¿Qué servicio estás buscando?</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <button 
            onClick={() => handleServiceClick('Estructuras Metálicas')}
            className="flex-1 min-w-[180px] bg-white text-black border border-gray-700 rounded-lg px-6 py-3 font-medium hover:bg-gray-200 transition cursor-pointer"
          >
            Estructuras Metálicas
          </button>
          <button 
            onClick={() => handleServiceClick('Diseño Arquitectónico')}
            className="flex-1 min-w-[180px] bg-white text-black border border-gray-700 rounded-lg px-6 py-3 font-medium hover:bg-gray-200 transition cursor-pointer"
          >
            Diseño Arquitectónico
          </button>
          <button 
            onClick={() => handleServiceClick('Planimetría')}
            className="flex-1 min-w-[180px] bg-white text-black border border-gray-700 rounded-lg px-6 py-3 font-medium hover:bg-gray-200 transition cursor-pointer"
          >
            Consultoría en Construcción
          </button>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => handleServiceClick('Planimetría')}
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            Pregunta
          </button>
          <button 
            onClick={() => handleServiceClick('Planimetría')}
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            Planimetría
          </button>
        </div>
      </section>
      {/* Sección final */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-4 items-center">
        <div className="flex flex-col items-center">
          {/* Placeholder para Video 2 (repetido) */}
          <div className="w-full aspect-[9/16] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-xl mb-2">
            <video src="/pauta2.mov" autoPlay muted loop className="w-full h-full object-cover rounded-lg" />
          </div>
          <p className="text-center text-gray-400 mt-2">¿Cómo desarrollamos tu proyecto desde cero?</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">¡Gracias por confiar en nosotros!</h2>
          <p className="text-gray-300 mb-6">Hemos recibido tu solicitud y uno de nuestros asesores se pondrá en contacto contigo lo antes posible para brindarte una cotización a la medida.</p>
          <div className="flex gap-4">
            <Link href="https://www.tiktok.com/@smartconstruccion_?_t=ZS-8wG8AKVsOMK&_r=1">
              <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition cursor-pointer">
                Ver proyectos realizados
              </button>
            </Link>
            
          </div>
        </div>

      </section>
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center">
            <div>
              <Image src="/smart.png" alt="Logo" width={400} height={400} />
            </div>
          </div>
        </div>
      </footer>
      
      
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
    </main>
  );
}
