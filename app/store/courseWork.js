import create from 'zustand';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useStore = create((set) => ({
    fileData: null,
    courseData: null,

    setFileData: (fileData) => {
        let storedFileData = JSON.parse(localStorage.getItem('fileData')) || [];
        storedFileData.push(fileData);
        localStorage.setItem('fileData', JSON.stringify(storedFileData));
        set({ fileData: storedFileData });
    },

    deleteFileData: (uploadedDate) => {
        let storedFileData = JSON.parse(localStorage.getItem('fileData')) || [];
        storedFileData = storedFileData.filter((item) => item.uploadDate !== uploadedDate);
        localStorage.setItem('fileData', JSON.stringify(storedFileData));
        set({ fileData: storedFileData });
    },

    setCourseData: async (courseData) => {
        try {
            let storedCoursework = JSON.parse(localStorage.getItem('courseData')) || [];
            storedCoursework.push(courseData);
            localStorage.setItem('courseData', JSON.stringify(storedCoursework));

            const response = await fetch(`${API_URL}/coursework`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });
            const newCoursework = await response.json();
            set({ courseworkData: newCoursework });

            const overallScore = Math.floor(Math.random() * 21 + 5);
            const minPoints = 3;
            let remainingPoints = overallScore - 3 * 3;

            const criteriaA = Math.floor(Math.random() * (remainingPoints + 1)) + minPoints;
            remainingPoints -= (criteriaA - minPoints);

            const criteriaB = Math.floor(Math.random() * (remainingPoints + 1)) + minPoints;
            const criteriaC = remainingPoints - (criteriaB - minPoints) + minPoints;
            const evaluationData = {
                coursework_id: newCoursework,
                title: newCoursework.title,
                subject: newCoursework.subject,
                time: "10 min read",
                overall_score: overallScore,
                criteriaA_score: criteriaA,
                criteriaB_score: criteriaB,
                criteriaC_score: criteriaC,
                evaluationDate: Date.now(),
                words: Math.floor(Math.random() * 3000 + 1000),
                type: Math.floor(Math.random() * 4 + 1),
                description: "The essay describes the how can the things...",
            };

            await fetch(`${API_URL}/evaluation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(evaluationData),
            });

        } catch (error) {
            console.error('Error in setCourseData:', error);
        }
    },

    loadStoreData: () => {
        const fileData = JSON.parse(localStorage.getItem('uploadedFile'));
        const courseData = JSON.parse(localStorage.getItem('courseData'));
        set({ fileData: fileData, courseData: courseData });
    },

    loadEvaluationData: async () => {
        try {
            const response = await fetch(`${API_URL}/evaluation`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const evaluationData = await response.json();
            set({ evaluationData: evaluationData });
        } catch (error) {
            console.error('Error in loadEvaluationData:', error);
        }
    }
}));
