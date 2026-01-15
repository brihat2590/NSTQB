"use client"
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Menu } from 'lucide-react';
import { toast } from 'sonner';
interface contactProps{
  name:string,
  email:string,
  subject:string,
  message:string

}


const ContactPage = () => {

  const[formData,setFormData]=useState<contactProps>({
    name:"",
    email:"",
    message:"",
    subject:""
  });
  const[loading,setLoading]=useState(false);


  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.message || !formData.subject){

      toast.error("Please fill in all fields");
      return;
    }

    try{
      setLoading(true);

      const response=await fetch("/api/contact",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      setLoading(false)
      if(response.ok){
        toast.success("Message has been sent successfully");
        setFormData({
          name:"",
          email:"",
          message:"",
          subject:""
        });
      }
      else{
        toast.error("Failed to send message. Please try again later.");
        setLoading(false);
      }

    }
    catch(err:any){
      console.log(err.message);
      toast.error("Failed to send message. Please try again later.");
    }
    finally{
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      {/* Main Container */}
      <div className="bg-white w-full max-w-6xl flex flex-col md:flex-row shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Left Logo/Icon */}
        <div className="absolute top-6 left-6">
            <div className="border-2 border-black w-8 h-8 rotate-45 flex items-center justify-center">
                <span className="rotate-[-45deg] font-bold text-xs">D</span>
            </div>
        </div>

        {/* Hamburger Menu Accent */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-red-400 p-2 hidden md:block">
            <Menu size={20} className="text-black" />
        </div>

        {/* LEFT SIDE: Form Section */}
        <div className="flex-1 p-12 md:p-20">
          <h1 className="text-5xl font-semibold mb-6 text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mb-12 max-w-sm leading-relaxed">
            Feel free to contact us any time. We will get back to you as soon as we can!
          </p>

          <form className="space-y-8" onSubmit={handleSubmit} >
            <div className="relative">
              <input 
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={(e)=>{
                  setFormData({...formData,name:e.target.value})
                }}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e)=>{
                  setFormData({...formData,email:e.target.value})
                }}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors placeholder-gray-400"
              />
            </div>
            <div className='relative'>

              <input type='text' placeholder='Subject' 
              value={formData.subject}
              onChange={(e)=>{
                setFormData({...formData,subject:e.target.value})
              }}
              
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors placeholder-gray-400"/>

            </div>
            <div className="relative">
              <textarea 
                rows={4} 
                placeholder="Message" 
                value={formData.message}
                onChange={(e)=>{
                  setFormData({...formData,message:e.target.value})
                }}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors placeholder-gray-400"
              />
            </div>
            
            <button
  type="submit"
  disabled={loading}
  className="bg-zinc-900 text-white w-full py-4 mt-8
             flex items-center justify-center gap-2
             disabled:opacity-60 disabled:cursor-not-allowed
             hover:bg-black transition"
>
  {loading ? (
    <>
      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      SENDING
    </>
  ) : (
    "SEND"
  )}
</button>
          </form>
        </div>

        {/* RIGHT SIDE: Info Section */}
        <div className="w-full md:w-[40%] relative flex flex-col">
          {/* Yellow Top Block */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 hidden md:block"></div>
          
          {/* Black Info Box */}
          <div className="bg-zinc-900 text-white p-12 md:p-16 mt-0 md:mt-24 mr-0 md:mr-10 flex-grow z-10">
            <h2 className="text-3xl font-bold mb-10">Info</h2>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4 group cursor-pointer">
                <Mail size={20} className="text-gray-400" />
                <a href="mailto:info@nstqb.org" className="text-sm">info@nstqb.org</a>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-gray-400" />
                <a href='tel:+9779851055879' className="text-sm">+977-9851055879</a>
              </div>
              
              <div className="flex items-center gap-4">
                <MapPin size={20} className="text-gray-400" />
                <span className="text-sm">Kathmandu, Nepal</span>
              </div>
              
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-gray-400" />
                <span className="text-sm">09:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Yellow Bottom Social Bar */}
          <div className="hidden md:flex bg-red-400 p-6  justify-center md:justify-end gap-6 md:pr-10">
            
          </div>
        </div>

        {/* Small Yellow Square Decor */}
        <div className="absolute top-20 right-[38%] w-8 h-8  hidden lg:block z-20"></div>
      </div>
    </div>
  );
};

export default ContactPage;