import React from "react";
import styles from "./BackToTop.module.sass";
import icon from "./images/backToTop.svg";
class BackToTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false,
    };
  }

  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", function (e) {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 2300) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    const { is_visible } = this.state;
    return (
      <div className={styles.backToTop}>
        {is_visible && (
          <div onClick={() => this.scrollToTop()}>
            <img className={styles.Img} src={icon} alt="Go to top" />
          </div>
        )}
      </div>
    );
  }
}

export default BackToTop;
