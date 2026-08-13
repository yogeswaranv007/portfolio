import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService } from '../../services/portfolioService';
import { Mail, MailOpen, Trash2, Calendar, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await portfolioService.getMessages();
      // Sort messages: newest first
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await portfolioService.markMessageRead(id);
      loadMessages();
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await portfolioService.deleteMessage(id);
      toast.success("Message deleted");
      if (selectedMessage?.id === id) setSelectedMessage(null);
      loadMessages();
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const handleMessageClick = (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      handleMarkRead(msg.id);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="animate-pulse h-64 bg-cards/50 rounded-2xl border border-borders/50 flex items-center justify-center">Loading inbox...</div>;

  return (
    <div className="space-y-8 pb-10 flex flex-col h-[calc(100vh-100px)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text">Inbox</h1>
        <p className="text-text/60 mt-1">Manage contact messages sent from your public portfolio.</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Messages List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 border border-borders/50 rounded-2xl bg-cards/30 overflow-hidden">
          <div className="p-4 border-b border-borders/50 bg-background/50 font-bold text-text flex items-center justify-between">
            <span>Messages ({messages.length})</span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              {messages.filter(m => !m.read).length} Unread
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-text/50 text-sm">No messages yet.</div>
            ) : (
              <div className="flex flex-col">
                {messages.map(msg => (
                  <button 
                    key={msg.id}
                    onClick={() => handleMessageClick(msg)}
                    className={`p-4 text-left border-b border-borders/50 transition-colors hover:bg-white/5 relative ${selectedMessage?.id === msg.id ? 'bg-primary/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}`}
                  >
                    {!msg.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                    <h4 className={`font-bold ${!msg.read ? 'text-text' : 'text-text/70'} line-clamp-1 pr-6`}>{msg.name}</h4>
                    <p className={`text-xs ${!msg.read ? 'text-text/90' : 'text-text/50'} mt-1 truncate`}>{msg.subject || 'No Subject'}</p>
                    <p className="text-xs text-text/40 mt-2">{formatDate(msg.date)}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Viewer */}
        <div className="w-full lg:w-2/3 border border-borders/50 rounded-2xl bg-cards/30 overflow-hidden flex flex-col">
          {selectedMessage ? (
            <>
              <div className="p-6 border-b border-borders/50 bg-background/50 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-text">{selectedMessage.subject || 'No Subject'}</h2>
                  <div className="flex flex-col gap-1 text-sm text-text/70">
                    <span className="flex items-center gap-2"><User className="w-4 h-4" /> {selectedMessage.name}</span>
                    <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> <a href={`mailto:${selectedMessage.email}`} className="hover:text-primary hover:underline">{selectedMessage.email}</a></span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {formatDate(selectedMessage.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <button 
                    onClick={(e) => handleDelete(selectedMessage.id, e)}
                    className="p-2 bg-background border border-borders text-text/70 rounded-lg hover:text-red-500 hover:border-red-500/50 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <p className="text-text/90 whitespace-pre-wrap leading-relaxed font-light">{selectedMessage.message}</p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-text/40 p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center border border-borders/50">
                <MailOpen className="w-8 h-8" />
              </div>
              <p>Select a message from the list to view its contents.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
