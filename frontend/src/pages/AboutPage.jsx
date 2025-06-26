import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Heart, 
  Users, 
  Globe, 
  Award, 
  ChefHat, 
  Sparkles,
  Clock,
  Star,
  Coffee,
  BookOpen
} from 'lucide-react';

const AboutPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    { icon: Users, label: 'Happy Cooks', value: '10,000+' },
    { icon: BookOpen, label: 'Recipes', value: '5,000+' },
    { icon: Globe, label: 'Countries', value: '50+' },
    { icon: Award, label: 'Awards', value: '15' },
  ];

  const features = [
    {
      icon: ChefHat,
      title: 'Expert Curated',
      description: 'Every recipe is carefully selected and tested by our team of culinary experts.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      title: 'Time Efficient',
      description: 'Find recipes that fit your schedule, from quick 15-minute meals to weekend projects.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Heart,
      title: 'Health Focused',
      description: 'Nutritious options for every dietary preference and health goal.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Star,
      title: 'Community Rated',
      description: 'Real reviews and ratings from home cooks just like you.',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="text-purple-700 font-medium">About Recipe Finder</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Cooking Made
              <br />
              <span className="text-purple-600">Simple & Fun</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Recipe Finder was born from a simple idea: everyone deserves access to delicious, 
              easy-to-make recipes that bring joy to their kitchen and table. We believe that 
              cooking should be an adventure, not a chore.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Coffee className="h-5 w-5 text-amber-600" />
                <span className="text-gray-700 font-medium">Made with ❤️ by Varshini</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map(({ icon: Icon, label, value }, index) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
                <div className="text-gray-600 font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose Recipe Finder?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a recipe app. We're your culinary companion, 
              helping you discover, create, and share amazing food experiences.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map(({ icon: Icon, title, description, color }, index) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
              >
                <div className={`bg-gradient-to-r ${color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-purple-600/10 to-indigo-600/10"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg"
            >
              <Heart className="h-5 w-5 text-red-500 fill-current" />
              <span className="text-gray-700 font-medium">Our Mission</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-8"
            >
              Bringing Families Together
              <br />
              <span className="text-purple-600">One Recipe at a Time</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 leading-relaxed mb-8"
            >
              We believe that food is more than sustenance—it's connection, culture, and creativity. 
              Our mission is to make cooking accessible, enjoyable, and meaningful for everyone, 
              regardless of their skill level or available time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <blockquote className="text-2xl font-medium text-gray-800 italic mb-4">
                "Cooking is not about convenience. It's about love, creativity, and the joy of sharing."
              </blockquote>
              <cite className="text-purple-600 font-semibold">— Varshini, Founder</cite>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;