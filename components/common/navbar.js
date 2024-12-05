import { useTheme } from '@/theme.provider';
import React from 'react'
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const Navbar = (props) => {
  const { label1, label2 } = props;
  const { theme, toggleTheme } = useTheme();


  return (
    <header className={`${theme === "light" ? "bg-white text-black" : "bg-slate-700 text-white"} shadow`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {label1 && label1()}
        <div className='flex gap-2'>
          {label2 && label2()}
          <button onClick={toggleTheme} className="ml-4 p-2 border rounded">
            Dark Mode
          </button>
          {/* <div className="flex items-center space-x-2">
            <Switch className="bg-white text-white" checked={theme} onCheckedChange={toggleTheme} id="theme" />
            <Label htmlFor="theme">Dark Mode</Label>
          </div> */}
        </div>

      </div>
    </header>
  )
}

export default Navbar
