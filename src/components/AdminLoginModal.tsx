import React, { useState } from 'react';
import { Lock, X, Eye, EyeOff, ShieldAlert, KeyRound, Sparkles } from 'lucide-react';
import { validateAdminCredentials, saveAdminSession } from '../utils/auth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const result = validateAdminCredentials(username, password);
      if (result.success) {
        saveAdminSession(rememberMe);
        setIsLoading(false);
        onSuccess();
      } else {
        setError(result.error || 'Authentication failed. Please check credentials.');
        setIsLoading(false);
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setUsername('admin');
    setPassword('Banos2026!');
    setError(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-auth-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md rounded-2xl border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A7368] hover:text-[#1A1817] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1A1817] text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h2 id="admin-auth-title" className="text-lg font-semibold text-[#1A1817]">
            Merchant Admin Access
          </h2>
          <p className="text-xs text-[#7A7368] max-w-xs mx-auto">
            Restricted portal for Bano’s.Store inventory managers and bulk export coordinators.
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#1A1817] mb-1">
              Admin Username / Email
            </label>
            <input
              type="text"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin or admin@banos.store"
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-[#1A1817]">
                Admin Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter administrator password"
                className="w-full pl-3 pr-9 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8375] hover:text-[#1A1817] p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Remember me & Auto-fill demo credentials */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#6B6356]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#1A1817]"
              />
              <span>Remember session</span>
            </label>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[#1A1817] font-medium hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <KeyRound className="w-3 h-3 text-[#D4AF37]" />
              <span>Use Demo Credentials</span>
            </button>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#1A1817] text-white text-xs font-semibold rounded-md hover:bg-[#332F2C] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate &amp; Open Admin Panel</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Credentials guide note */}
        <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD5] text-[11px] text-[#7A7368] space-y-1">
          <div className="font-semibold text-[#1A1817] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Administrator Credentials</span>
          </div>
          <p>
            Username: <code className="font-mono text-[#1A1817] font-semibold">admin</code> or <code className="font-mono text-[#1A1817]">admin@banos.store</code>
          </p>
          <p>
            Password: <code className="font-mono text-[#1A1817] font-semibold">Banos2026!</code> (or <code className="font-mono text-[#1A1817]">admin123</code>)
          </p>
        </div>

      </div>
    </div>
  );
};
