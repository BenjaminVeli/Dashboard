import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { getMenuList } from "../utils/menu-list";
import ProfileImg from "../assets/img/profile.jpg";
import { ChevronLeft, ChevronDown } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  // Nuevo estado para controlar qué menús están abiertos
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const menuList = getMenuList(location.pathname);

  // Función para abrir/cerrar submenús
  const toggleMenu = (menuIndex) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuIndex]: !prev[menuIndex]
    }));
  };

  return (
    <aside className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen bg-black relative`} aria-label="Sidebar">
      <ChevronLeft 
        size={36} 
        className={`absolute cursor-pointer p-2 -right-3 top-36 border rounded 
          border-gray-400 text-white bg-black ${!open && 'rotate-180'}`} 
        onClick={() => setOpen(!open)} 
      />

      <div className="flex flex-col items-center gap-y-2 px-4 pt-20 pb-10">
        <img 
          src={ProfileImg} 
          alt="ProfileImg" 
          className="w-12 h-12 rounded object-cover ring-2 ring-white" 
        />
        <div className={`overflow-hidden transition-all duration-300 ${!open ? 'w-0' : 'w-full text-center'}`}>
          <p className="text-green-500 font-medium text-lg whitespace-nowrap">
            Benjamín Veli Mariano
          </p>
          <span className="text-sm text-gray-400 whitespace-nowrap">
            Administrador
          </span>
        </div>
      </div>

      <nav className="px-4">
        <ul className="space-y-6">
          {menuList.map((group, groupIndex) => (
            <li key={groupIndex}>
              <div className={`overflow-hidden transition-all duration-300 ${!open ? 'h-0' : 'h-auto'}`}>
                {group.groupLabel && (
                  <p className="text-gray-400 text-sm uppercase ml-2">
                    {group.groupLabel}
                  </p>
                )}
              </div>

              <ul className="mt-2 space-y-4">
                {group.menus.map((menu, menuIndex) => (
                  <li key={menuIndex}>
                    {/* Si el menú tiene una ruta, usa NavLink */}
                    {menu.to ? (
                      <NavLink
                        to={menu.to}
                        className={`
                          flex items-center ${open ? 'justify-between' : 'justify-center'}
                          gap-3 text-white p-2.5 rounded-md hover:bg-gray-700
                          transition-all duration-300
                        `}
                      >
                        <div className="flex items-center gap-3">
                          {menu.icon && (
                            <menu.icon
                              size={20}
                              className={`transition-transform duration-300 ${!open ? 'transform scale-110' : ''}`}
                            />
                          )}
                          <span className={`
                            whitespace-nowrap overflow-hidden transition-all duration-300
                            ${!open ? 'w-0' : 'w-auto'}
                          `}>
                            {menu.label}
                          </span>
                        </div>

                        {/* Mostrar flecha si tiene submenús y está abierto */}
                        {menu.submenus?.length > 0 && open && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${openMenus[menuIndex] ? 'rotate-180' : ''}`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleMenu(menuIndex);
                            }}
                          />
                        )}
                      </NavLink>
                    ) : (
                      // Si no tiene ruta, usa un div
                      <div
                        className={`
                          flex items-center ${open ? 'justify-between' : 'justify-center'}
                          gap-3 text-white p-2.5 rounded-md hover:bg-gray-700 cursor-pointer
                          transition-all duration-300
                        `}
                        onClick={() => toggleMenu(menuIndex)}
                      >
                        <div className="flex items-center gap-3">
                          {menu.icon && (
                            <menu.icon
                              size={20}
                              className={`transition-transform duration-300 ${!open ? 'transform scale-110' : ''}`}
                            />
                          )}
                          <span className={`
                            whitespace-nowrap overflow-hidden transition-all duration-300
                            ${!open ? 'w-0' : 'w-auto'}
                          `}>
                            {menu.label}
                          </span>
                        </div>

                        {/* Flecha para menús sin ruta */}
                        {menu.submenus?.length > 0 && open && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${openMenus[menuIndex] ? 'rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    )}

                    {/* Submenús */}
                    {menu.submenus?.length > 0 && (
                      <ul className={`
                        ml-6 space-y-2 overflow-hidden transition-all duration-300
                        ${!open ? 'h-0' : openMenus[menuIndex] ? 'h-auto mt-2' : 'h-0'}
                      `}>
                        {menu.submenus.map((submenu, submenuIndex) => (
                          <li key={submenuIndex}>
                            <NavLink
                              to={submenu.to || ''}
                              className={({ isActive }) => `
                                flex items-center gap-3 text-gray-300
                                py-2 px-4 rounded-md
                                transition-all duration-200
                                ${isActive ? 'text-green-500' : 'hover:text-white hover:bg-gray-800'}
                              `}
                            >
                              {submenu.icon && <submenu.icon size={18} />}
                              <span className="whitespace-nowrap">{submenu.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;