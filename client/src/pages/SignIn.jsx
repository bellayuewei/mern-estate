import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.user); // 从 Redux 取状态

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // 用户动了输入框就清空错误
    if (error) dispatch(signInFailure(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure('MISSING_FIELDS'));
      return;
    }

    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 如果后端用 HttpOnly Cookie，打开这一行：
        // credentials: 'include',
        body: JSON.stringify(formData),
      });
      console.log('[signin] res.ok/status:', res.ok, res.status);
      console.log('[signin] content-type:', res.headers.get('content-type'));

      // 后端可能返回 {success, user, message} 或直接返回用户对象；两种都兼容
      const data = await res.json().catch(() => ({}));
      console.log('[signin] raw data:', data);

      const status = data?.statusCode ?? res.status;
      const msg = (data?.message || '').toLowerCase();



      if (!res.ok || data?.success === false) {
        console.log('[signin] FAIL -> message:', data?.message);
        if (status === 404 || (msg.includes('not') && msg.includes('found'))) {
          dispatch(signInFailure('USER_NOT_FOUND'));
        } else if (status === 401 || msg.includes('wrong') || msg.includes('credentials')) {
          dispatch(signInFailure('WRONG_PASSWORD'));
        } else {
          dispatch(signInFailure('SERVER'));
        }
        return;
      }

      // 成功：把用户写进 Redux，然后跳转

      //const user = data.user ?? data;   // 后端可能是 {success, user:{...}} 或直接 {...}
      const user = data.user ?? data.rest ?? data;
      console.log('[signin] dispatch user:', user);

      dispatch(signInSuccess(user));
      try { localStorage.setItem('currentUser', JSON.stringify(user)); } catch {}
      navigate('/');
    } catch {
      dispatch(signInFailure('NETWORK'));
    }
  };

  // 统一错误文案映射（基于 Redux 的 error）
  const errorMessage = useMemo(() => {
    switch (error) {
      case 'MISSING_FIELDS': return 'Please enter email and password';
      case 'USER_NOT_FOUND': return 'User not found';
      case 'WRONG_PASSWORD': return 'Wrong Credentials';
      case 'NETWORK':        return 'Network Problems';
      case 'SERVER':         return 'Server Problems';
      case null:
      case undefined:
      case '':               return null;
      default:               return typeof error === 'string' ? error : 'Sign-in error';
    }
  }, [error]);

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
        <OAuth/>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don’t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>

      {errorMessage && (
        <p className="mt-3 text-red-600 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
