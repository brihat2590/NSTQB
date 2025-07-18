'use client'
// components/mind-map/EnhancedCTFLMindMap.tsx
import { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Award,
  BookOpen,
  RefreshCw,
  FlaskConical,
  ClipboardList,
  Wrench,
  CheckCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface Node {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  children?: Node[];
}

const CTFL_SYLLABUS: Node = {
  id: 'root',
  title: 'CTFL Syllabus',
  description: 'ISTQB Certified Tester Foundation Level',
  icon: <Award className="h-6 w-6" />,
  color: 'from-blue-600 to-indigo-700',
  children: [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      description: 'Testing principles and processes',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'from-blue-500 to-indigo-600',
      children: [
        { 
          id: '1.1', 
          title: 'Testing Principles', 
          description: '7 core testing principles',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '1.2', 
          title: 'Test Process', 
          description: 'Planning, analysis, design',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '1.3', 
          title: 'Psychology of Testing', 
          description: 'Human factors in testing',
          icon: <CheckCircle className="h-4 w-4" />
        },
      ],
    },
    {
      id: 'lifecycle',
      title: 'Testing Lifecycle',
      description: 'SDLC integration',
      icon: <RefreshCw className="h-5 w-5" />,
      color: 'from-green-500 to-teal-600',
      children: [
        { 
          id: '2.1', 
          title: 'Test Levels', 
          description: 'Unit, integration, system',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '2.2', 
          title: 'Test Types', 
          description: 'Functional, non-functional',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '2.3', 
          title: 'Maintenance Testing', 
          description: 'Testing software changes',
          icon: <CheckCircle className="h-4 w-4" />
        },
      ],
    },
    {
      id: 'techniques',
      title: 'Test Techniques',
      description: 'Black/white box approaches',
      icon: <FlaskConical className="h-5 w-5" />,
      color: 'from-yellow-500 to-amber-600',
      children: [
        { 
          id: '3.1', 
          title: 'Black-box', 
          description: 'Equivalence partitioning, BVA',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '3.2', 
          title: 'White-box', 
          description: 'Statement/decision coverage',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '3.3', 
          title: 'Experience-based', 
          description: 'Error guessing, exploratory',
          icon: <CheckCircle className="h-4 w-4" />
        },
      ],
    },
    {
      id: 'management',
      title: 'Test Management',
      description: 'Planning and control',
      icon: <ClipboardList className="h-5 w-5" />,
      color: 'from-purple-500 to-pink-600',
      children: [
        { 
          id: '4.1', 
          title: 'Test Planning', 
          description: 'Objectives, strategies, schedules',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '4.2', 
          title: 'Risk Management', 
          description: 'Risk identification, mitigation',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '4.3', 
          title: 'Defect Management', 
          description: 'Tracking and reporting',
          icon: <CheckCircle className="h-4 w-4" />
        },
      ],
    },
    {
      id: 'tools',
      title: 'Test Tools',
      description: 'Automation support',
      icon: <Wrench className="h-5 w-5" />,
      color: 'from-cyan-500 to-blue-600',
      children: [
        { 
          id: '5.1', 
          title: 'Tool Selection', 
          description: 'Evaluation criteria',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '5.2', 
          title: 'Benefits & Risks', 
          description: 'ROI, implementation challenges',
          icon: <CheckCircle className="h-4 w-4" />
        },
        { 
          id: '5.3', 
          title: 'Tool Categories', 
          description: 'Management, automation, performance',
          icon: <CheckCircle className="h-4 w-4" />
        },
      ],
    },
  ],
};

const MindMapNode = ({ node, depth = 0, index = 0 }: { node: Node; depth?: number; index?: number }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 1);
  const controls = useAnimation();
  
  const toggleExpand = async () => {
    if (node.children) {
      await controls.start({
        scale: [1, 0.95, 1],
        transition: { duration: 0.2 }
      });
      setIsExpanded(!isExpanded);
    }
  };
  
  // Calculate delay based on depth and index for staggered animation
  const animationDelay = depth * 0.05 + index * 0.03;
  
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: animationDelay }}
    >
      <motion.button
        className={`group relative p-4 rounded-xl shadow-lg backdrop-blur-sm transition-all w-full text-left
          ${depth === 0 
            ? `bg-gradient-to-r ${node.color} text-white font-bold text-lg` 
            : depth === 1 
              ? `bg-gradient-to-r ${node.color} text-white font-semibold` 
              : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'}
          ${isExpanded ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}
          hover:shadow-xl focus:outline-none`}
        onClick={toggleExpand}
        whileHover={{ scale: depth < 2 ? 1.02 : 1.01 }}
        whileTap={{ scale: 0.98 }}
        animate={controls}
        layout
      >
        <motion.div layout className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${depth === 0 ? 'bg-white/20' : depth === 1 ? 'bg-white/20' : 'bg-indigo-100'}`}>
            {node.icon || <CheckCircle className={`${depth === 2 ? 'h-4 w-4 text-indigo-600' : 'h-5 w-5'}`} />}
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold mb-1 flex items-center gap-2">
              {node.title}
              {node.children && (
                <span className="text-xs opacity-80">
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              )}
            </h3>
            <p className={`${depth === 0 ? 'text-blue-100' : depth === 1 ? 'text-indigo-50' : 'text-gray-600'} text-xs`}>
              {node.description}
            </p>
          </div>
        </motion.div>
        
        {/* Decorative element */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl ${
          depth === 0 ? 'bg-blue-500/50' : 
          depth === 1 ? 'bg-white/30' : 
          'bg-indigo-100'
        }`}></div>
      </motion.button>

      {node.children && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className={`mt-4 pl-8 space-y-4 relative
                ${depth > 0 ? 'border-l-2 border-indigo-200 ml-4' : ''}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              layout
            >
              {node.children.map((child, idx) => (
                <MindMapNode 
                  key={child.id} 
                  node={child} 
                  depth={depth + 1} 
                  index={idx}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

const EnhancedCTFLMindMap = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl">
        <h1 className="text-xl md:text-2xl font-bold text-white">CTFL Examination Syllabus</h1>
        <p className="text-blue-100 text-sm">Interactive ISTQB Certification Curriculum Mind Map</p>
      </div>
      
      <motion.div 
        className="flex-1 p-4 md:p-6 bg-gradient-to-br from-indigo-50 to-white rounded-b-xl overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <MindMapNode node={CTFL_SYLLABUS} />
        </div>
      </motion.div>
      
      <div className="p-3 text-center text-xs text-gray-500 bg-white border-t">
        <p>Click on any node to expand/collapse sections</p>
        <p className="mt-1">Based on ISTQB CTFL Syllabus v4.0</p>
      </div>
    </div>
  );
};

export default EnhancedCTFLMindMap;