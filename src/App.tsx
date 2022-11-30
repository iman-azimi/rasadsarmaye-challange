import React, {useState} from 'react';


function checkHasFollowing (followerUser: any,followingUser: string) {
  if (!followerUser) {
    return true
  }
  
  const user = followerUser.find((item: any)=>{
    return item === followingUser
  })
  return user ? true : false
}

function App() {
  interface IUser {
    name: string
    follower: any
    following: any
  }
  const [name, setName] = useState('');
  const [follower, setFollower] = useState('');
  const [following, setFollowing] = useState('');
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('users') || '[]');
  const [users, setUsers] = useState<IUser[]>(user)
  const [selected, setSelected] = useState<IUser>({name: '', follower: [], following: []});

  const handleAddUser = () => {
    const user = users.find(user=>{
      return user.name === name
    })
    if (user) {
      setMessage('کاربری با این نام وجود دارد')
      return
    }
    setName('')
    setUsers([
      ...users,
      { name: name, follower: [], following: [] }
    ])
    localStorage.setItem('users', JSON.stringify([
      ...users,
      { name: name, follower: [], following: [] }
    ]));
    setMessage('کاربر ثبت شد')
  }

  const handleSetUser = (user: any) => {
    setSelected(user)    
  }
  const handleAddFollower = () => {
    const followerIndex = users.findIndex((user)=>{
      return user.name === follower
    })
    

    const followingIndex = users.findIndex((user)=>{
      return user.name === following
    })

    
    if ((!followerIndex && !followingIndex ) || checkHasFollowing(users[followerIndex]?.following,following)) {   
      setMessage('کاربر انتخابی شما وجود ندارد و یا قبلا به لیست دنبال کننده ها اضافه شده است')
      return 
    }
    users[followerIndex].following = [...users[followerIndex].following, following]
    users[followingIndex].follower = [...users[followingIndex].follower, follower]
    console.log(users)
    setFollowing('')
    setFollower('')
    localStorage.setItem('users', JSON.stringify([
      ...users,
    ]));
    setMessage('کاربر با موفقیت اضافه شد')
        
  }
  const handleRemoveInfo = () => {
    setUsers([])
    localStorage.removeItem('users');
  }
  
  return (
    <div className="App">
      <section className='w-1/3 mx-auto mt-10'>
        <div className='flex justify-between'>
          <input type="text" className='border border-neutral-400 h-8 p-2 active:border-red-300 rounded-md'
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddUser()} />
          <button onClick={() => handleRemoveInfo()} className='bg-red-500 text-white px-2 rounded-lg text-sm' >حذف اطلاعات</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className='bg-blue-400 rounded-md p-4 text-white'>
            <h1>اسامی</h1>
            <ul>
            <ul>
              {users.map((user, i) => (
                <li key={i} onClick={() =>handleSetUser(user)} className='cursor-pointer mt-3'>{user.name}</li>
              ))}
            </ul>
            </ul>
          </div>
          <div className='bg-blue-400 rounded-md p-4 text-white'>
            <div className='flex'>
              <div className='w-1/2'>
                <h1>دنبال کنندگان</h1>
                <ul>
                  {selected.follower.map((user: string, i: number) => (
                  <li key={i} className='cursor-pointer mt-3'>{user}</li>
                ))}
                </ul>
              </div>
              <div className='w-1/2'>
                <h1>دنبال شوندگان</h1>
                <ul>
                  {selected.following.map((user: string, i: number) => (
                  <li key={i} className='cursor-pointer mt-3'>{user}</li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='flex mt-4'>
          <input type="text" value={follower} onChange={e => setFollower(e.target.value)} 
          className='border border-neutral-400 h-8 p-2 w-1/4 active:border-red-300 rounded-md mx-2' />
          دنبال کننده ی
          <input type="text" value={following} onChange={e => setFollowing(e.target.value)} 
          className='border border-neutral-400 h-8 p-2 w-1/4 active:border-red-300 rounded-md mx-2' />
          است.
          <button className='bg-blue-500 rounded-lg px-8 mr-4 text-white h-8' disabled={!follower || !following} onClick={handleAddFollower}>ثبت</button>
        </div>
        <div className='text-blue-500 text-sm text-center mt-5'>{message}</div>
      </section>
    </div>
  );
}

export default App;
