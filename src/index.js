import 'intersection-observer';
// import 'picturefill';
import './styles/style.scss';
import Lazyload from './scripts/modules/lazy-load';

new Lazyload('.prodimg__lazy', "20px", ".prodimg");

export default Lazyload;