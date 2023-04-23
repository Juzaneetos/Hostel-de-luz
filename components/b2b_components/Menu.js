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
            <Link href="/b2b/customers" title="Frequência" style={{margin: '0 auto'}}>
            <Image style={{maxWidth: '200px', padding: '15px'}} width={500} src={require('../../assets/img/hostellogo.png')} />
            </Link>
          </div>

          <div className="ec-navigation overflow-auto" data-simplebar>
            <ul className="nav sidebar-inner" id="sidebar-menu">
              <li className={isMenuLinkActived}>
                <Link className="sidenav-item-link" href="/b2b/customers">
                  <FaLaptop size={24} style={{ marginRight: "0.94rem", color: '#0D6EFD' }} />
                  <span className="nav-text" style={{ color: '#0D6EFD' }}>Check-in Ativos</span>
                </Link>
                <hr />
              </li>


              

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
                  href="/b2b/customersall"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Hóspedes Ativos</span>
                </Link>
              </li>

              {/* <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/checkInprovisorio"
                >
                  <FaBookmark size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Check-In Provisório</span>
                </Link>
              </li> */}


              <hr/>

             
              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/Trocadecama"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Troca de Cama</span>
                </Link>
              </li>

              <hr/>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/customerscadastro"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Cadatro de Hóspedes</span>
                </Link>
              </li>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/hospedesall"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Todos os Hóspedes</span>
                </Link>
              </li>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/customersallactive"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Todos os Check-ins</span>
                </Link>
              </li>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/financeiro"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Financeiro Hóspedes</span>
                </Link>
              </li>

              

              <hr/>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/despesas"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Despesas</span>
                </Link>
              </li>

              <li>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/financeirodespesas"
                >
                  <FaUserAlt size={24} style={{ marginRight: "0.94rem" }} />
                  <span className="nav-text">Financeiro Despesas</span>
                </Link>
              </li>

              <hr/>

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
