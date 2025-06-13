import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import CustomCursor from '../components/CustomCursor';

interface FormData {
  name: string;
  email: string;
  website: string;
  socialMedia: string;
  otherInfo: string;
}

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setShowModal(true);
    
    // Reset form after submission
    setTimeout(() => {
      reset();
      setShowModal(false);
    }, 4000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0e1016] text-[#e4ded7] relative overflow-x-hidden">
      <CustomCursor />
      
      {/* Background Texture - same as original */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
          `,
          backgroundSize: '400px 400px, 600px 600px'
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-[#1a1d24]/80 backdrop-blur-sm rounded-3xl border border-[#e4ded7]/10 p-8 md:p-12 shadow-2xl"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#e4ded7] to-[#e4ded7]/60 bg-clip-text text-transparent">
                Get In Touch
              </h1>
              <p className="text-[#e4ded7]/70 text-lg">
                Share your details and let's start your J Curve experience
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Label htmlFor="name" className="text-[#e4ded7] text-sm font-medium mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register('name', { required: 'Name is required' })}
                  className="bg-[#0e1016]/50 border-[#e4ded7]/20 text-[#e4ded7] placeholder:text-[#e4ded7]/40 focus:border-[#e4ded7]/50 h-12 rounded-xl"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-[#e4ded7] text-sm font-medium mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="bg-[#0e1016]/50 border-[#e4ded7]/20 text-[#e4ded7] placeholder:text-[#e4ded7]/40 focus:border-[#e4ded7]/50 h-12 rounded-xl"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="website" className="text-[#e4ded7] text-sm font-medium mb-2 block">
                  Website (Optional)
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  {...register('website')}
                  className="bg-[#0e1016]/50 border-[#e4ded7]/20 text-[#e4ded7] placeholder:text-[#e4ded7]/40 focus:border-[#e4ded7]/50 h-12 rounded-xl"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="socialMedia" className="text-[#e4ded7] text-sm font-medium mb-2 block">
                  Social Media Link (Optional)
                </Label>
                <Input
                  id="socialMedia"
                  type="text"
                  placeholder="LinkedIn, Instagram, or other social profile"
                  {...register('socialMedia')}
                  className="bg-[#0e1016]/50 border-[#e4ded7]/20 text-[#e4ded7] placeholder:text-[#e4ded7]/40 focus:border-[#e4ded7]/50 h-12 rounded-xl"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="otherInfo" className="text-[#e4ded7] text-sm font-medium mb-2 block">
                  Tell Us More *
                </Label>
                <Textarea
                  id="otherInfo"
                  placeholder="Share any additional information about your project, goals, or how we can help you..."
                  {...register('otherInfo', { required: 'Please share some additional information' })}
                  className="bg-[#0e1016]/50 border-[#e4ded7]/20 text-[#e4ded7] placeholder:text-[#e4ded7]/40 focus:border-[#e4ded7]/50 min-h-[120px] rounded-xl resize-none"
                />
                {errors.otherInfo && (
                  <p className="text-red-400 text-sm mt-1">{errors.otherInfo.message}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={!isValid}
                    className="w-full h-14 bg-[#e4ded7] text-[#0e1016] hover:bg-[#e4ded7]/90 disabled:bg-[#e4ded7]/20 disabled:text-[#e4ded7]/40 font-semibold text-lg rounded-xl transition-all duration-300"
                  >
                    Submit Details
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-[#1a1d24] border-[#e4ded7]/20 text-[#e4ded7] max-w-md mx-4 rounded-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <DialogHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
              >
                <span className="text-2xl">💛</span>
              </motion.div>
              <DialogTitle className="text-2xl font-bold mb-4">
                Thank You!
              </DialogTitle>
            </DialogHeader>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center text-[#e4ded7]/80 leading-relaxed"
            >
              ✨ Thank you for filling in your details and for trusting us with your J Curve experience. 
              You'll receive a call in the next 24 to 48 hours. 💛
            </motion.p>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactForm;
