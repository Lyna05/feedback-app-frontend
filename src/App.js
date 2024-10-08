import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import { getFeedback } from './api/feedbackApi';
import './styles/App.css';

/**
 * Die Hauptkomponente der Feedback-App.
 * Verwaltert das Laden und Anzeigen von Feedback-Daten sowie das Hinzufügen und Löschen von Feedback-Einträgen.
 * @returns {JSX.Element} Das Layout der Feedback-App.
 */
function App() {
  // Zustand für die Feedback-Liste
  const [feedbacks, setFeedbacks] = useState([]);

  // useEffect Hook wird beim ersten Rendern aufgerufen, um die Feedbacks zu laden
  useEffect(() => {
      loadFeedback();
  }, []); // Leeres Abhängigkeits-Array sorgt dafür, dass es nur einmal aufgerufen wird.

  /**
   * Lädt alle Feedback-Daten vom Backend und aktualisiert den Zustand.
   * @returns {Promise<void>} Aktualisiert die Feedbacks im Zustand.
   */
  const loadFeedback = async () => {
    try {
      const feedbackData = await getFeedback();
      setFeedbacks(feedbackData); // Setzt die geladenen Feedback-Daten in den Zustand
    } catch (error) {
      console.error("Fehler beim Laden der Feedbacks:", error);
    }
  }

  return (
    <div className='container'>
      <h1>Feedback App</h1>
      {/* Formular für das Hinzufügen von Feedback */}
      <FeedbackForm onFeedbackAdded={loadFeedback} />
      {/* Liste der Feedbacks mit Funktion zum Löschen */}
      <FeedbackList feedbacks={feedbacks} onFeedbackDeleted={loadFeedback} />
    </div>
  );
}

export default App;
