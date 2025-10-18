import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  // 用一个变量表示错误“类型”（而不是直接放字符串）
  const [error, setError] = useState(null); 
  // 例如：null | 'MISSING_FIELDS' | 'USER_NOT_FOUND' | 'WRONG_PASSWORD' | 'NETWORK' | 'SERVER'

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // 只要用户开始修改，就清除统一错误
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError('MISSING_FIELDS');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 若后端用 HttpOnly Cookie：credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      const status = data?.statusCode ?? res.status;
      const msg = (data?.message || '').toLowerCase();

      if (!res.ok || data?.success === false) {
        if (status === 404 || msg.includes('not') && msg.includes('found')) {
          setError('USER_NOT_FOUND');
        } else if (status === 401 || msg.includes('wrong') && msg.includes('credentials')) {
          setError('WRONG_PASSWORD');
        } else {
          setError('SERVER'); // 其他服务器错误
        }
        return;
      }

      // 成功：清空错误并跳转
      setError(null);
      navigate('/');
    } catch (e2) {
      setError('NETWORK'); // 网络/解析错误
    } finally {
      setLoading(false);
    }
  };

  // 统一错误信息映射（根据 error 类型输出一条文案）
  const errorMessage = (() => {
    switch (error) {
      case 'MISSING_FIELDS': return 'Please enter email and password';
      case 'USER_NOT_FOUND': return 'User not found';
      case 'WRONG_PASSWORD': return 'Wrong Credentials';
      case 'NETWORK':        return 'Network Problems';
      case 'SERVER':         return 'Sever Problems';
      default: return null;
    }
  })();

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          id="email"
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-xl text-center uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don’t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>

      {/* 统一错误展示：放在 “Don’t have an account?” 下面 */}
      {errorMessage && (
        <p className="mt-3 text-red-600 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}