
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase, checkIsAdmin, updateAdminLastLogin } from '@/lib/supabase';

interface LoginFormProps {
  onLoginSuccess: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, isLoading, setIsLoading }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      // Clean up any existing auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Attempt to sign out globally first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Ignore errors here, continue with sign in
      }
      
      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Check if the user is an admin
      const isAdmin = await checkIsAdmin(email);
      
      if (!isAdmin) {
        throw new Error("Ce compte n'a pas les droits d'administration.");
      }
      
      // Update last login time
      await updateAdminLastLogin(email);
      
      toast({
        title: "Accès autorisé",
        description: "Bienvenue dans l'interface d'administration."
      });
      
      onLoginSuccess();
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMsg(error.message || "Identifiants incorrects.");
      
      toast({
        title: "Accès refusé",
        description: error.message || "Identifiants incorrects.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="mb-6 text-center">Administration</h1>
      
      {errorMsg && (
        <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
          {errorMsg}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
            placeholder="Entrez votre email"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-2 font-medium">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
            placeholder="Entrez votre mot de passe"
          />
        </div>
        
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
