import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { useCookies, expires } from 'react-cookie';

import { useEffect, useState } from "react";
import {
  FaImages,
  FaUserAlt,
  FaUsers,
  FaUserFriends,
  FaPaintBrush,
  FaArrowsAltH,
  FaBookmark,
  FaShoppingCart,
  FaStarHalfAlt,
  FaThList,
  FaTags,
  FaLaptop,
  FaCaretDown,
  FaKeycdn,
  FaPlus,
  FaClipboardList,
  FaRegQuestionCircle,
  FaPowerOff,
} from "react-icons/fa";
import {
  BsFileLock,
  BsBookmark
} from "react-icons/bs"



// import '../assets/js/custom'
// import '../../assets/images';

export default function Menu() {
  const [isMenuLinkActived, setIsMenuLinkActived] = useState("active");
  const [ordersMenu, setOrdersMenu] = useState(false);
  const [productsMenu, setProductsMenu] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  let level = cookies.user_level;

  function expandOrdersMenu() {
    setOrdersMenu(true);
    setProductsMenu(false);
    setCategoryMenu(false);
  }

  function expandProductsMenu() {
    setOrdersMenu(false);
    setProductsMenu(true);
    setCategoryMenu(false);
  }

  function expandCategoryMenu() {
    setOrdersMenu(false);
    setProductsMenu(false);
    setCategoryMenu(true);
  }

  function clearCookies() {

    setCookie("access_token", "", { path: '/' });
    setCookie("user_id", ``, { path: '/' });
    setCookie("user_login", ``, { path: '/' });
    setCookie("user_level", ``, { path: '/' });

    return router.push("/b2b/login");
  }

  return (
    <>
      <div style={{ width: '400px' }}></div>
      <div
        className="ec-left-sidebar ec-bg-sidebar"
        style={{ backgroundColor: "#FFF", borderRight: "1px solid #F3F3F3" }}
      >
        <div id="sidebar" className="sidebar ec-sidebar-footer p-0">
          <div className="ec-brand">
            <Link href="/b2b" title="Frequência">
             
            </Link>
          </div>

          <div className="ec-navigation overflow-auto" data-simplebar>
            <ul className="nav sidebar-inner" id="sidebar-menu">
              <li className={isMenuLinkActived}>
                <Link className="sidenav-item-link" href="/b2b">
                  <FaLaptop size={24} style={{ marginRight: "0.94rem", color: '#B01D21' }} />
                  <span className="nav-text" style={{ color: '#B01D21' }}>Pedidos Pendentes</span>
                </Link>
                <hr />
              </li>


              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/quartos"
                >
                  <FaBookmark size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Quartos</span>
                </Link>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/hoteis"
                >
                  <FaBookmark size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Hostels</span>
                </Link>
              </li>

              <hr/>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/checkIn"
                >
                  <FaBookmark size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Check-In</span>
                </Link>
              </li>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/checkInprovisorio"
                >
                  <FaBookmark size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Check-In Provisório</span>
                </Link>
              </li>
            

              <hr/>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/customers"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Hospedes</span>
                </Link>
              </li>

              <hr/>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/faq"
                >
                  <FaRegQuestionCircle size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Perguntas FAQ</span>
                </Link>
              </li>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/policy_privacy"
                >
                  <BsFileLock size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Política de Privacidade</span>
                </Link>
              </li>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/terms_responsibility"
                >
                  <FaKeycdn size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Termos e Responsabilidade</span>
                </Link>
              </li>

              <hr/>

              {
              level < 30 ?
                <></>
                :
                <li>
                  <Link
                    className="sidenav-item-link"
                    href="/b2b/access"
                  >
                    <FaStarHalfAlt size={24} style={{ marginRight: "0.94rem" }} />
                    <span className="nav-text">Acessos</span>
                  </Link>
                </li>
              }

            </ul>
          </div>
          <div className="btn-off"><a className="text-start mr-3 ml-3"><FaPowerOff onClick={() => clearCookies()} size={30} /></a></div>
        </div>
      </div>
    </>
  );
}
