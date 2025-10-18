import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData]=useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange=(e)=>{
    setFormData(
      {
        ...formData,
        [e.target.id]:e.target.value,
      }
    );
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json(); // 后端必须总是返回 JSON
    if (!res.ok || data?.success === false) {
      throw new Error(data?.message || `HTTP ${res.status}`);
    }

    console.log('success:', data);
    // TODO: 成功后跳转或清空表单
    navigate('/sign-in');
  } catch (err) {
    console.error(err);
    setError(err.message || '请求失败');
  } finally {
    setLoading(false); // 关键：不管怎样都复位
  }
};

  console.log(formData);
  return <div className='p-3 max-w-lg mx-auto'>
    <h1 className ='text-3xl text-center font-semibold my-7' >Sign Up</h1>  
    <form onSubmit = {handleSubmit} className='flex flex-col gap-4'>
      <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' 
      onChange={handleChange}></input>
      <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}></input>
      <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}></input>
      <button disabled={loading} className=' bg-slate-700 text-white p-3 rounded-xl text-center uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...':'Sign Up'}</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to ={"/sign-in"}>
      <span className='text-blue-700' >Sign In</span>
      </Link>
    </div>
  </div>
}