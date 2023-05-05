import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { useCookies, expires } from 'react-cookie';

import { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaBookmark,
  FaStarHalfAlt,
  FaLaptop,
  FaKeycdn,
  FaRegQuestionCircle,
  FaPowerOff,
  FaUsers,
  FaHotel
} from "react-icons/fa";
import {
  BsFileLock,
  BsCalendar2Check,
  BsFillPersonCheckFill
} from "react-icons/bs"
import {
  BiBed
} from "react-icons/bi"
import {
  GiMoneyStack,
  GiPayMoney,
  GiReceiveMoney,
  GiBroom
} from "react-icons/gi"
import {
  GrMoney
} from "react-icons/gr"



// import '../assets/js/custom'
// import '../../assets/images';

export default function Menu({parametro}) {
  const [isMenuLinkActived, setIsMenuLinkActived] = useState("active");
  const [ordersMenu, setOrdersMenu] = useState(false);
  const [productsMenu, setProductsMenu] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  console.log(parametro)
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
            <Link href="/b2b/" style={{ margin: '0 auto' }}>
              <Image style={{ maxWidth: '200px', padding: '15px' }} width={500} src={require('../../assets/img/hostellogo.png')} alt="Logo Hotel de Luz" />
            </Link>
          </div>

          <div className="ec-navigation overflow-auto" data-simplebar>

            <ul className="nav sidebar-inner" id="sidebar-menu">

              <li className={parametro === '1' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/checkIn"
                >
                  <BsCalendar2Check size={24} />
                  <span className="nav-text">Novo Check-In</span>
                </Link>
              </li>

              <li className={parametro === '2' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/customers"
                >
                  <FaLaptop size={24} />
                  <span className="nav-text" >Check-in Ativos</span>
                </Link>
              </li>


              <li className={parametro === '3' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/customersallactive"
                >
                  <FaUsers size={24} />
                  <span className="nav-text">Todos os Check-ins</span>
                </Link>
              </li>

              <hr />

              <li className={parametro === '4' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/customerscadastro"
                >
                  <BsFillPersonCheckFill size={24} />
                  <span className="nav-text">Novo Hóspede</span>
                </Link>
              </li>

              <li className={parametro === '5' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/hospedesall"
                >
                  <FaUsers size={24} />
                  <span className="nav-text">Todos os Hóspedes</span>
                </Link>
              </li>

              <hr />

              <li className={parametro === '6' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/Trocadecama"
                >
                  <GiBroom size={24} />
                  <span className="nav-text">Troca de Roupa Cama</span>
                </Link>
              </li>

              <hr />

              <li className={parametro === '7' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/financeiro"
                >
                  <GiMoneyStack size={24} />
                  <span className="nav-text">Financeiro Hóspedes</span>
                </Link>
              </li>

              <hr />

              <li className={parametro === '8' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/despesas"
                >
                  <GiPayMoney size={24} />
                  <span className="nav-text">Despesas</span>
                </Link>
              </li>

              <li className={parametro === '9' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/financeirodespesas"
                >
                  <GiReceiveMoney size={24} />
                  <span className="nav-text">Financeiro Despesas</span>
                </Link>
              </li>

              <hr />

              <li className={parametro === '10' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/quartos"
                >
                  <BiBed size={24} />
                  <span className="nav-text">Quartos</span>
                </Link>
              </li>

              <li className={parametro === '11' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/hoteis"
                >
                  <FaHotel size={24} />
                  <span className="nav-text">Hostels</span>
                </Link>
              </li>

              <hr />

              <li className={parametro === '12' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/faq"
                >
                  <FaRegQuestionCircle size={24} />
                  <span className="nav-text">Perguntas FAQ</span>
                </Link>
              </li>

              <li className={parametro === '13' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/policy_privacy"
                >
                  <BsFileLock size={24} />
                  <span className="nav-text">Política de Privacidade</span>
                </Link>
              </li>

              <li className={parametro === '14' ? `active`: ``}>
                <Link
                  className="sidenav-item-link"
                  href="/b2b/terms_responsibility"
                >
                  <FaKeycdn size={24} />
                  <span className="nav-text">Termos e Responsabilidade</span>
                </Link>
              </li>

              <hr />

              {level < 30 ?
                <></>
                :
                <li className={parametro === '15' ? `active`: ``}>
                  <Link
                    className="sidenav-item-link"
                    href="/b2b/access"
                  >
                    <FaStarHalfAlt size={24} />
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
