import Icon from "../../components/Icon";
import styles from "../SettingSliderHotBid/settingArrow.module.sass";

const SlickArrow = ({ currentSlide, slideCount, children, onClick , ...props }) => (
  <div className={styles.position} onClick={onClick}>
          {children}
  </div>
)

export const settings = {
  autoplay: false,
  speed: 500,
  autoplaySpeed: 4000,
  dots: false,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: (
    <SlickArrow>
      <button className={styles.btn}>
        <Icon name="arrow-prev" size="14" />
      </button>
    </SlickArrow>
  ),
  nextArrow: (
    <SlickArrow>
      <button className={styles.btn1}>
        <Icon name="arrow-next" size="14" />
      </button>
    </SlickArrow>
  ),

  responsive: [
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 810,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
  ],
};
