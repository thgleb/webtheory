;(function() {
    function SiteHeader(selector) {
        this.header = document.querySelector(selector);

        if (!this.header) {
            return false;
        }

        this.headerContainer = document.querySelector(".site-header__container");

        this.menuButton = this.header.querySelector(".site-header__menu");

        this.MENU_OPENED = "site-header_menu_opened";

        this.adjustHeight = function() {
            document.body.style.marginTop = this.header.offsetHeight + "px";
        };

        this.toggleMenu = function() {
            this.headerContainer.classList.toggle(this.MENU_OPENED);
        };

        this.setEvents = function() {
            window.addEventListener("load", this.adjustHeight.bind(this));
            window.addEventListener("resize", this.adjustHeight.bind(this));

            this.menuButton.addEventListener("click", this.toggleMenu.bind(this));
        };
    }

    function EnrollForm(selector) {
        this.form = document.querySelector(selector);

        if (!this.form) {
            return false;
        }

        this.contactTypeSelect = this.form.elements["contact_type"];
        this.contactAddressInput = this.form.elements["contact_address"];

        this.isStudentCheckbox = this.form.elements["is_student"];
        this.studentArea = this.form.querySelector("#apply__student-area");
        this.studentIdFile = this.form.elements["student_id"];
        this.studentRepostLink = this.form.elements["student_repost_link"];

        this.hasCouponCheckbox = this.form.elements["has_coupon"];
        this.couponArea = this.form.querySelector("#apply__coupon-area");
        this.couponInput = this.form.elements["coupon"];

        // Init
        this.initContactAddressInput = function() {
            var placeholder,
                type;

            if (this.contactTypeSelect.value === "email") {
                type = "email";
                placeholder = this.contactAddressInput.getAttribute("data-placeholder-email");
            } else if (this.contactTypeSelect.value === "social") {
                type = "url";
                placeholder = this.contactAddressInput.getAttribute("data-placeholder-social");
            }

            this.contactAddressInput.type = type;
            this.contactAddressInput.placeholder = placeholder;
        };

        this.initStudentArea = function() {
            this.studentArea.style.display = "none";
            this.studentIdFile.removeAttribute("required");
            this.studentRepostLink.removeAttribute("required");
        };

        this.initCouponArea = function() {
            this.couponArea.style.display = "none";
            this.couponInput.removeAttribute("required");
        };

        // Event Handlers
        this.contactTypeChanged = function() {
            this.contactAddressInput.focus();
            this.initContactAddressInput();
        };

        this.studentCheckboxChanged = function() {
            this.isStudentCheckbox.parentNode.classList.toggle("checkbox_checked");
            this.studentArea.style.display = this.isStudentCheckbox.checked ? "block" : "none";

            this.studentIdFile.setAttribute("required", true);
            this.studentRepostLink.setAttribute("required", true);
        };

        this.studentIdFileChanged = function() {
            var className = "file-input_selected";

            if (this.studentIdFile.files.length > 0) {
                this.studentIdFile.parentNode.classList.add(className);
            } else {
                this.studentIdFile.parentNode.classList.remove(className);
            }
        };

        this.hasCouponCheckboxChanged = function() {
            this.hasCouponCheckbox.parentNode.classList.toggle("checkbox_checked");

            var visibility;

            if (this.hasCouponCheckbox.checked) {
                visibility = "block";
                this.couponInput.setAttribute("required", true);
            } else {
                visibility = "none";
                this.couponInput.removeAttribute("required");
            }

            this.couponArea.style.display = visibility;
        };

        // Main
        this.init = function() {
            this.initContactAddressInput();
            this.initStudentArea();
            this.initCouponArea();

            return this;
        };

        this.setEvents = function() {
            this.contactTypeSelect.addEventListener("change", this.contactTypeChanged.bind(this));
            this.isStudentCheckbox.addEventListener("change", this.studentCheckboxChanged.bind(this));
            this.studentIdFile.addEventListener("change", this.studentIdFileChanged.bind(this));
            this.hasCouponCheckbox.addEventListener("change", this.hasCouponCheckboxChanged.bind(this));

            return this;
        };
    }

    var header = new SiteHeader(".site-header");
    header.setEvents();

    var enrollForm = new EnrollForm("#apply");

    if (enrollForm.form) {
        enrollForm.init().setEvents();
    }
})();