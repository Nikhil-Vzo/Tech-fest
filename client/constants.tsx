import React from 'react';
import { Music, Mic, Zap, BookOpen, Camera, Code } from 'lucide-react';

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    'Music': <Music className="w-4 h-4" />,
    'Dance': <Zap className="w-4 h-4" />,
    'Tech': <Code className="w-4 h-4" />,
    'Workshop': <BookOpen className="w-4 h-4" />,
    'Competition': <Mic className="w-4 h-4" />,
    'Exhibition': <Camera className="w-4 h-4" />,
};

export const EVENTS = [
    {
        id: '1',
        date: 'Day 1',
        time: '10:00 AM',
        category: 'Tech',
        title: 'Hackathon Kickoff',
        location: 'Main Auditorium',
        description: 'The start of the 24-hour coding marathon.',
    },
    {
        id: '2',
        date: 'Day 1',
        time: '02:00 PM',
        category: 'Workshop',
        title: 'AI Workshop',
        location: 'Lab 3',
        description: 'Learn the basics of Generative AI.',
    },
    {
        id: '3',
        date: 'Day 2',
        time: '11:00 AM',
        category: 'Music',
        title: 'Battle of Bands',
        location: 'Open Air Theatre',
        description: 'Top college bands compete for the title.',
    },
    {
        id: '4',
        date: 'Day 2',
        time: '04:00 PM',
        category: 'Dance',
        title: 'Group Dance Finals',
        location: 'Main Stage',
        description: 'Electrifying performances by dance crews.',
    },
];

export const GALLERY_IMAGES = [
    {
        id: '1',
        src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
        caption: 'Crowd Energy',
    },
    {
        id: '2',
        src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
        caption: 'Neon Nights',
    },
    {
        id: '3',
        src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800',
        caption: 'Main Stage',
    },
    {
        id: '4',
        src: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800',
        caption: 'Backstage Vibes',
    },
    {
        id: '5',
        src: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800',
        caption: 'DJ Set',
    },
    {
        id: '6',
        src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
        caption: 'Festival Lights',
    },
];

export const CHHATTISGARH_COLLEGES = [
    "Amity University Raipur",
    "NIT Raipur",
    "IIM Raipur",
    "HNLU Raipur",
    "IIIT Naya Raipur",
    "Pt. Ravishankar Shukla University",
    "CSVTU Bhilai",
    "BIT Durg",
    "Rungta College Bhilai",
    "Shankaracharya College Bhilai",
    "MATS University",
    "Kalinga University",
    "ITM University",
    "ICFAI University",
    "Other"
];
