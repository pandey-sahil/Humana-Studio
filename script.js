function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  var locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  function navAnimation() {
    let lastScrollY = 0;

    locoScroll.on("scroll", (args) => {
      let scrollY = args.scroll.y;

      if (scrollY > lastScrollY) {
        // Scrolling down
        gsap.to(".nav", {
          yPercent: -100,
          duration: 1,
          ease: "power2.out",
        });
        // gsap.to(".logo", {
        //   opacity: 1,
        //   duration: 1,
        //   ease: "power2.out",
        // });
      } else {
        // Scrolling up
        gsap.to(".nav", {
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
        });
      }

      lastScrollY = scrollY;
    });
  };
  navAnimation();

  function page6ResizeAnime() {
    const wrappers = document.querySelectorAll('#page6ColWrapper');

    wrappers.forEach(wrapper => {
        // Toggle height on click
        wrapper.addEventListener('click', function () {
            if (this.classList.contains('h-[10.313rem]')) {
                this.classList.remove('h-[10.313rem]');
            } else {
                this.classList.add('h-[10.313rem]');
            }

            setTimeout(() => {
                locoScroll.update();
            }, 300); // Adjust the delay if necessary
        });

        // Hover effect to move image wrapper up
        wrapper.addEventListener('mouseenter', function () {
            const imgWrapper = this.querySelector('.page6ImgWrapper');
            if (imgWrapper) {
                imgWrapper.style.transform = 'translateY(-20px)'; // Move up by 20px or adjust as needed
                imgWrapper.style.transition = 'transform 0.3s ease';
            }
        });

        // Revert the image wrapper position when hover ends
        wrapper.addEventListener('mouseleave', function () {
            const imgWrapper = this.querySelector('.page6ImgWrapper');
            if (imgWrapper) {
                imgWrapper.style.transform = 'translateY(0)';
            }
        });
    });
}

// Initialize the animation function
page6ResizeAnime();

// Refresh ScrollTrigger and update Locomotive Scroll
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  // Initial update
  ScrollTrigger.refresh();
}
loco();

function page1() {
  const months = [
    "January", "February",
    "March", "April", "May",
    "June", "July", "August",
    "September", "October",
    "November", "December"
  ];

  var timeDiv = document.querySelector('.time')
  var dateDiv = document.querySelector('.date')
  var time = new Date();
  var currentTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  var currentDay = time.toLocaleString('en-us', { weekday: 'long' })
  var currentDate = currentDay + '<br>' + months[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear()

  timeDiv.innerText += ` ` + currentTime;
  dateDiv.innerHTML += ` ` + currentDate
}
page1();

function page3Animation() {
  gsap.to("#page3Wrapper", {
    transform: "translateX(-102%)",
    scrollTrigger: {
      start: "top 0%",
      end: "top -100%",
      trigger: ".page3",
      scroller: "main",
      // markers:true,
      pin: true,
      scrub: 1
    }
  });
};
page3Animation();

function page6Animation() {
  var allWrapper = document.querySelectorAll('#page6ColWrapper');
  var allImgWrapper = document.querySelectorAll('#page6ImgWrapper');



  allWrapper.forEach(function (wrapper) {
    var imgs = wrapper.childNodes[11]
    // console.log('wrapper: ', wrapper)
    console.log('imgs: ', imgs)
    gsap.set(imgs,{
      y:200
    })
    wrapper.addEventListener('mouseenter', function () {
      gsap.from(imgs, {
        y: 0
      })
    })
  })
};
// page6Animation();
