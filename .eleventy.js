const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
// const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const htmlmin = require("html-minifier-terser");

const { readdir, readFile, writeFile } = require("fs/promises");
const { join } = require("path");
const { minify } = require("terser");

module.exports = async function (eleventyConfig) {
  // const { getName } = await import("country-list");
  const country = require("countryjs");
  eleventyConfig.addFilter("countryName", (code) => {
    const overrides = {
      RS: "Serbia",
    };
    return overrides[code] ?? country.name(code) ?? code;
  });
  eleventyConfig.addFilter("regionName", (code) => {
    return country.region(code) ?? "";
  });
  eleventyConfig.addFilter("appsWithoutCategories", (apps) => {
    return (
      apps.filter((app) => app.marketplace_category_ids.length === 0) ?? []
    );
  });

  eleventyConfig.addFilter("appsWithCategories", (apps) => {
    return apps.filter((app) => app.marketplace_category_ids.length > 0) ?? [];
  });

  // Language Name
  const languages = require("@cospired/i18n-iso-languages");
  languages.registerLocale(
    require("@cospired/i18n-iso-languages/langs/en.json"),
  );
  eleventyConfig.addFilter("languageName", (code) => {
    const overrides = {
      el: "Greek",
      he: "Hebrew",
      lad: "Judeo-Spanish",
      man: "Mandarin",
      "zh-yue": "Yue Chinese",
    };

    return overrides[code] ?? languages.getName(code, "en") ?? code;
  });

  eleventyConfig.addFilter("serviceIcon", (id) => {
    const paths = {
      // integrations
      "045b33ae-2f4a-42f1-b508-129895d0bd75":
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M8.09797 2.79192C8.44944 2.44045 9.01929 2.44045 9.37076 2.79192L12.7798 6.20092L14.5826 4.3981L14.5903 4.40583L15.5185 3.47764C15.8699 3.12617 16.4398 3.12617 16.7913 3.47764C17.1427 3.82911 17.1427 4.39896 16.7913 4.75043L15.8631 5.67862L19.795 9.61051C21.2009 11.0164 21.2009 13.2958 19.795 14.7017L17.8858 16.6109L21.2097 19.9348C21.5612 20.2863 21.5612 20.8562 21.2097 21.2076C20.8583 21.5591 20.2884 21.5591 19.9369 21.2076L16.613 17.8837L15.1886 19.308C13.7828 20.7139 11.5034 20.7139 10.0975 19.308L6.16558 15.3761L5.3551 16.1866C5.00363 16.5381 4.43378 16.5381 4.08231 16.1866C3.73084 15.8351 3.73084 15.2653 4.08231 14.9138L4.89279 14.1033L4.88507 14.0956L6.02123 12.9594L2.61224 9.55045C2.26076 9.19898 2.26076 8.62913 2.61224 8.27765C2.96371 7.92618 3.53356 7.92618 3.88503 8.27765L7.29402 11.6866L11.507 7.47371L8.09797 4.06472C7.7465 3.71324 7.7465 3.1434 8.09797 2.79192ZM7.43837 14.1033L11.3703 18.0352C12.0732 18.7382 13.2129 18.7382 13.9159 18.0352L18.5222 13.4289C19.2251 12.7259 19.2251 11.5862 18.5222 10.8833L14.5903 6.95141L7.43837 14.1033Z" fill="currentColor"></path>',
      // Setup & Configuration
      "52a46142-7f71-4d69-9770-9aea043980a9":
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4444 3.98701C11.3496 3.98701 11.257 4.01558 11.1787 4.06898C11.1004 4.12238 11.04 4.19814 11.0055 4.28637L10.4046 5.81719C10.3302 6.00686 10.1936 6.16566 10.0172 6.26761L8.02863 7.41687C7.85168 7.51913 7.64519 7.55813 7.44313 7.52743L5.81927 7.28077C5.72555 7.26676 5.62934 7.28126 5.54402 7.32249C5.45856 7.36379 5.38755 7.42993 5.3403 7.51224L5.33831 7.51571L4.78157 8.47559C4.73397 8.55774 4.71221 8.65245 4.71928 8.74713C4.72634 8.84185 4.76186 8.93223 4.82117 9.00642L5.84737 10.2919C5.97467 10.4514 6.044 10.6494 6.044 10.8534V13.1492C6.044 13.3529 5.97489 13.5506 5.84795 13.7099L4.82212 14.9977C4.76302 15.0718 4.72727 15.1625 4.7202 15.257C4.71315 15.3513 4.73464 15.4456 4.78185 15.5275L5.33935 16.4887C5.38673 16.5708 5.45779 16.6368 5.54324 16.6779C5.62869 16.719 5.72455 16.7334 5.81832 16.7192L7.44313 16.4724C7.64519 16.4417 7.85168 16.4807 8.02863 16.583L10.0172 17.7322C10.1936 17.8342 10.3302 17.993 10.4046 18.1827L11.0053 19.7132C11.0399 19.8014 11.1004 19.8775 11.1787 19.9309C11.257 19.9843 11.3496 20.0128 11.4444 20.0128H12.5579C12.6527 20.0128 12.7453 19.9843 12.8236 19.9309C12.9019 19.8775 12.9622 19.8017 12.9968 19.7135L13.5976 18.1827C13.6721 17.993 13.8087 17.8342 13.9851 17.7322L15.9737 16.583C16.1506 16.4807 16.3571 16.4417 16.5592 16.4724L18.184 16.7192C18.2777 16.7334 18.3736 16.719 18.459 16.6779C18.5445 16.6368 18.6156 16.5708 18.6629 16.4887L18.664 16.4869L19.2207 15.527C19.2684 15.4448 19.2901 15.3502 19.283 15.2555C19.2759 15.1607 19.2404 15.0704 19.1811 14.9962L18.1549 13.7107C18.0276 13.5512 17.9583 13.3532 17.9583 13.1492V10.8534C17.9583 10.65 18.0272 10.4526 18.1538 10.2934L19.1805 9.00169C19.2396 8.92759 19.275 8.83739 19.2821 8.74286C19.2891 8.64854 19.2677 8.55429 19.2204 8.47235L18.6629 7.51116C18.6156 7.42901 18.5445 7.36307 18.459 7.32195C18.3736 7.28082 18.2777 7.26642 18.184 7.28063L16.5592 7.52743C16.3571 7.55813 16.1506 7.51913 15.9737 7.41687L13.9851 6.26761C13.8087 6.16566 13.6721 6.00686 13.5976 5.81719L12.997 4.28668C12.9624 4.19844 12.9019 4.12238 12.8236 4.06898C12.7453 4.01558 12.6527 3.98701 12.5579 3.98701H11.4444ZM10.1645 2.58194C10.5417 2.32464 10.9877 2.18702 11.4443 2.18701H12.558C13.0146 2.18702 13.4606 2.32464 13.8378 2.58194C14.215 2.83917 14.5058 3.20407 14.6725 3.62906L15.1582 4.86663L16.601 5.70043L17.914 5.50099C18.3657 5.43254 18.828 5.50187 19.2397 5.70003C19.651 5.89798 19.9931 6.21526 20.2214 6.61048L20.2221 6.61167L20.7785 7.57102C21.0071 7.96643 21.1111 8.42156 21.0771 8.877C21.0431 9.33233 20.8726 9.76683 20.5879 10.1238L19.7583 11.1675V12.834L20.5871 13.8722C20.8729 14.2297 21.044 14.6652 21.078 15.1216C21.1121 15.5779 21.0075 16.034 20.7779 16.4299L20.2221 17.3882L20.2215 17.3892C19.9932 17.7845 19.651 18.1018 19.2397 18.2998C18.828 18.498 18.3661 18.5674 17.9143 18.4989L16.601 18.2994L15.1582 19.1332L14.6727 20.3705C14.506 20.7955 14.215 21.1607 13.8378 21.4179C13.4606 21.6752 13.0146 21.8128 12.558 21.8128H11.4443C10.9877 21.8128 10.5417 21.6752 10.1645 21.4179C9.78732 21.1607 9.49645 20.7958 9.32976 20.3708L8.84405 19.1332L7.4013 18.2994L6.0883 18.4989C5.63655 18.5673 5.17432 18.498 4.76261 18.2998C4.35124 18.1018 4.00909 17.7845 3.78076 17.3892L3.22378 16.4288C2.99522 16.0334 2.89117 15.5783 2.92521 15.1228C2.95923 14.6676 3.12965 14.2332 3.41422 13.8762L4.244 12.8345V11.1686L3.41518 10.1303C3.12942 9.77288 2.95831 9.33742 2.92426 8.88104C2.89022 8.42466 2.99483 7.96863 3.22438 7.57272L3.78037 6.61411C4.00806 6.21841 4.34972 5.90048 4.7608 5.70182C5.17256 5.50283 5.63479 5.43277 6.08702 5.5008L6.0883 5.50099L7.4013 5.70043L8.84405 4.86663L9.32964 3.62937C9.49631 3.20425 9.78723 2.83923 10.1645 2.58194ZM9.42526 9.42541C10.1084 8.74224 11.035 8.35844 12.0011 8.35844C12.7216 8.35844 13.4259 8.57209 14.025 8.97237C14.6241 9.37265 15.091 9.94159 15.3667 10.6072C15.6424 11.2729 15.7146 12.0053 15.574 12.712C15.4334 13.4186 15.0865 14.0677 14.577 14.5772C14.0676 15.0866 13.4185 15.4336 12.7118 15.5742C12.0052 15.7147 11.2727 15.6426 10.6071 15.3669C9.94144 15.0911 9.3725 14.6242 8.97222 14.0252C8.57194 13.4261 8.35829 12.7218 8.35829 12.0013C8.35829 11.0352 8.74209 10.1086 9.42526 9.42541ZM12.0011 10.1584C11.5124 10.1584 11.0437 10.3526 10.698 10.6982C10.3524 11.0438 10.1583 11.5125 10.1583 12.0013C10.1583 12.3658 10.2664 12.7221 10.4689 13.0251C10.6714 13.3282 10.9592 13.5644 11.2959 13.7039C11.6327 13.8434 12.0032 13.8799 12.3607 13.8087C12.7181 13.7376 13.0465 13.5621 13.3042 13.3044C13.562 13.0467 13.7375 12.7183 13.8086 12.3608C13.8797 12.0033 13.8432 11.6328 13.7037 11.2961C13.5642 10.9593 13.328 10.6715 13.025 10.469C12.7219 10.2665 12.3656 10.1584 12.0011 10.1584Z" fill="currentColor"></path>',
      // Data migration
      "83c61fc7-0789-414e-8bf1-6d1f11ab0658":
        '<path d="M16.9962 16.2285C17.4066 16.4573 17.4066 17.0478 16.9962 17.2766L11.6284 20.2693C11.2284 20.4922 10.7362 20.2031 10.7362 19.7452L10.7362 13.76C10.7362 13.3021 11.2284 13.0129 11.6284 13.2359L16.9962 16.2285Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.7022 8.22763C16.5088 5.49995 13.688 3.66553 10.4689 3.92416L10.4676 3.92427C7.06665 4.20253 4.29308 6.88426 3.88857 10.279C3.81305 10.8495 3.81834 11.4142 3.88145 11.953C2.48426 12.3214 1.44698 13.5822 1.5021 15.1151C1.51221 16.9014 2.96579 18.3488 4.75445 18.3488H8.40005C8.89711 18.3488 9.30005 17.9458 9.30005 17.4488C9.30005 16.9517 8.89711 16.5488 8.40005 16.5488H4.75445C3.95365 16.5488 3.30204 15.8972 3.30204 15.0964V15.0776L3.30126 15.0589C3.26966 14.3011 3.8849 13.6438 4.72741 13.6438H6.10696L5.81493 12.5179C5.64957 11.8804 5.58327 11.1874 5.67363 10.5105L5.67542 10.4971C5.97691 7.94637 8.06851 5.92688 10.6137 5.71833C13.2172 5.50946 15.4635 7.10998 16.2286 9.40536L16.4337 10.0208L17.436 10.0207C19.2374 10.0208 20.7001 11.4836 20.7001 13.2847C20.7001 14.3919 20.1482 15.3719 19.3001 15.9637C18.8925 16.2482 18.7927 16.8092 19.0772 17.2168C19.3616 17.6245 19.9226 17.7243 20.3303 17.4398C21.6395 16.5262 22.5001 15.0057 22.5001 13.2847C22.5001 10.5788 20.3742 8.36621 17.7022 8.22763Z" fill="currentColor"></path>',
      // Data services
      "8ef29f7a-3945-4c70-9704-01fabc9e5f5b":
        '<path d="M12.7984 11.2004H19.1984C20.5216 11.2004 21.5984 10.1236 21.5984 8.80039V6.40039C21.5984 5.07719 20.5216 4.00039 19.1984 4.00039H17.1296L15.9984 2.86919C15.696 2.56679 15.2944 2.40039 14.8672 2.40039H12.7984C11.4752 2.40039 10.3984 3.47719 10.3984 4.80039V6.40039H3.99844V3.20039C3.99844 2.75799 3.64004 2.40039 3.19844 2.40039C2.75684 2.40039 2.39844 2.75799 2.39844 3.20039V14.4004C2.39844 16.606 4.19284 18.4004 6.39844 18.4004H10.3984V19.2004C10.3984 20.5236 11.4752 21.6004 12.7984 21.6004H19.1984C20.5216 21.6004 21.5984 20.5236 21.5984 19.2004V16.8004C21.5984 15.4772 20.5216 14.4004 19.1984 14.4004H17.1296L15.9984 13.2692C15.696 12.9668 15.2944 12.8004 14.8672 12.8004H12.7984C11.4752 12.8004 10.3984 13.8772 10.3984 15.2004V16.8004H6.39844C5.07524 16.8004 3.99844 15.7236 3.99844 14.4004V8.00039H10.3984V8.80039C10.3984 10.1236 11.4752 11.2004 12.7984 11.2004ZM11.9984 15.2004C11.9984 14.7588 12.3576 14.4004 12.7984 14.4004H14.8672L15.9984 15.5316C16.3008 15.834 16.7024 16.0004 17.1296 16.0004H19.1984C19.6392 16.0004 19.9984 16.3588 19.9984 16.8004V19.2004C19.9984 19.642 19.6392 20.0004 19.1984 20.0004H12.7984C12.3576 20.0004 11.9984 19.642 11.9984 19.2004V15.2004ZM11.9984 4.80039C11.9984 4.35879 12.3576 4.00039 12.7984 4.00039H14.8672L15.9984 5.13159C16.3008 5.43399 16.7024 5.60039 17.1296 5.60039H19.1984C19.6392 5.60039 19.9984 5.95879 19.9984 6.40039V8.80039C19.9984 9.24199 19.6392 9.60039 19.1984 9.60039H12.7984C12.3576 9.60039 11.9984 9.24199 11.9984 8.80039V4.80039Z" fill="currentColor"></path>',
      // Workflow optim
      "ac493459-186f-44c6-bdad-9bfa57384180":
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.5755 14.7446H19.2115V9.00855C19.2115 8.20455 18.5515 7.54455 17.7475 7.54455H16.7395L12.5275 3.33255C12.2755 3.08055 11.8795 3.08055 11.6275 3.33255L7.41552 7.54455H6.27552C5.47152 7.54455 4.81152 8.20455 4.81152 9.00855V14.7446H2.44752C2.09952 14.7446 1.81152 15.0326 1.81152 15.3806V20.4806C1.81152 20.8286 2.09952 21.1166 2.44752 21.1166H8.81952C9.16752 21.1166 9.45552 20.8286 9.45552 20.4806V15.3806C9.45552 15.0326 9.16752 14.7446 8.81952 14.7446H6.45552V9.20056H7.53552C7.63152 9.20056 7.72752 9.18856 7.82352 9.15255L11.6275 12.9566C11.8795 13.2086 12.2755 13.2086 12.5275 12.9566L16.2955 9.18855C16.2955 9.18855 16.4035 9.21255 16.4635 9.21255H17.5435V14.7566H15.1795C14.8315 14.7566 14.5435 15.0446 14.5435 15.3926V20.4926C14.5435 20.8406 14.8315 21.1286 15.1795 21.1286H21.5515C21.8995 21.1286 22.1875 20.8406 22.1875 20.4926V15.3926C22.1875 15.0446 21.8995 14.7566 21.5515 14.7566L21.5755 14.7446ZM7.79952 16.4006V19.4606H3.46752V16.4006H7.79952ZM12.0835 11.0486L9.16752 8.13255L12.0835 5.21655L14.9995 8.13255L12.0835 11.0486ZM20.5555 19.4606H16.2235V16.4006H20.5555V19.4606Z" fill="currentColor"></path>',
      // App services
      "cd46462c-267f-454d-a242-ad1c3eb1ba02":
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M6.78987 5.8559C6.78987 3.94722 8.33704 2.3999 10.2456 2.3999C12.1541 2.3999 13.7013 3.94722 13.7013 5.8559C13.7013 5.87422 13.7012 5.89251 13.7009 5.91077H15.6606C17.0013 5.91077 18.0882 6.99774 18.0882 8.33859V10.2999C18.107 10.2996 18.1258 10.2994 18.1447 10.2994C20.0532 10.2994 21.6004 11.8468 21.6004 13.7554C21.6004 15.6641 20.0532 17.2114 18.1447 17.2114C18.1258 17.2114 18.107 17.2113 18.0882 17.211V19.1721C18.0882 20.5129 17.0013 21.5999 15.6606 21.5999H4.82804C3.48728 21.5999 2.40039 20.5129 2.40039 19.1721V16.2386C2.40039 15.9715 2.53006 15.7209 2.74817 15.5667C2.96628 15.4125 3.24568 15.3738 3.49751 15.4628C3.68526 15.5292 3.8881 15.5657 4.10123 15.5657C5.10093 15.5657 5.91136 14.7552 5.91136 13.7554C5.91136 12.7556 5.10093 11.9451 4.10123 11.9451C3.8881 11.9451 3.68526 11.9816 3.49751 12.048C3.24568 12.1371 2.96628 12.0984 2.74817 11.9441C2.53006 11.7899 2.40039 11.5394 2.40039 11.2723V8.33859C2.40039 6.99774 3.48729 5.91077 4.82804 5.91077H6.7903C6.79001 5.89251 6.78987 5.87422 6.78987 5.8559ZM10.2456 4.04562C9.24589 4.04562 8.43546 4.8561 8.43546 5.8559C8.43546 6.06896 8.47192 6.27172 8.53826 6.45941C8.62726 6.71126 8.5885 6.99064 8.43428 7.20873C8.28006 7.42683 8.02958 7.55648 7.76249 7.55648H4.82804C4.39612 7.55648 4.04599 7.90664 4.04599 8.33859V10.2999C4.06437 10.2996 4.08279 10.2994 4.10123 10.2994C6.00978 10.2994 7.55695 11.8467 7.55695 13.7554C7.55695 15.6641 6.00978 17.2114 4.10123 17.2114C4.08279 17.2114 4.06437 17.2113 4.04599 17.211V19.1721C4.04599 19.604 4.39612 19.9542 4.82804 19.9542H15.6606C16.0925 19.9542 16.4426 19.604 16.4426 19.1721V16.2382C16.4426 15.971 16.5724 15.7204 16.7906 15.5662C17.0088 15.412 17.2883 15.3733 17.5401 15.4625C17.7281 15.5291 17.9312 15.5657 18.1447 15.5657C19.1444 15.5657 19.9548 14.7552 19.9548 13.7554C19.9548 12.7556 19.1444 11.9452 18.1447 11.9452C17.9312 11.9452 17.7281 11.9818 17.5401 12.0483C17.2883 12.1375 17.0088 12.0989 16.7906 11.9447C16.5724 11.7905 16.4426 11.5399 16.4426 11.2727V8.33859C16.4426 7.90664 16.0925 7.55648 15.6606 7.55648H12.7287C12.4616 7.55648 12.2111 7.42683 12.0569 7.20873C11.9027 6.99064 11.8639 6.71126 11.9529 6.45941C12.0192 6.27172 12.0557 6.06896 12.0557 5.8559C12.0557 4.8561 11.2453 4.04562 10.2456 4.04562Z" fill="currentColor"></path>',
      // Automations
      "dace6a06-c21d-4e98-853a-70c656dcad4c":
        '<path d="M3.40158 11.6304C3.89774 11.6012 4.32356 11.9799 4.35276 12.4761C4.59368 16.5661 7.98789 19.809 12.1389 19.8091C14.7788 19.8091 17.1138 18.4978 18.5256 16.4888L16.51 16.7983C16.0189 16.8737 15.5593 16.5374 15.4836 16.0464C15.408 15.5552 15.7454 15.0957 16.2365 15.02L19.8967 14.4565C20.5241 14.3601 21.1093 14.7948 21.1985 15.4233L21.7649 19.4204C21.8345 19.9126 21.4914 20.3683 20.9992 20.438C20.5074 20.5074 20.0525 20.1651 19.9826 19.6733L19.7297 17.8872C17.9742 20.151 15.2273 21.6099 12.1389 21.6099C7.02911 21.6097 2.85232 17.6175 2.55588 12.5815C2.52668 12.0853 2.90539 11.6596 3.40158 11.6304ZM12.0344 2.3999C17.1443 2.3999 21.322 6.39217 21.6184 11.4282C21.6476 11.9243 21.2687 12.35 20.7727 12.3794C20.2765 12.4086 19.8507 12.0299 19.8215 11.5337C19.5806 7.44351 16.1855 4.20068 12.0344 4.20068C9.39473 4.2008 7.06037 5.51212 5.64865 7.521L7.6633 7.21045C8.15451 7.13488 8.614 7.47221 8.68967 7.96338C8.76525 8.45466 8.42802 8.91416 7.93674 8.98975L4.27756 9.55322C3.65009 9.64976 3.06398 9.21495 2.97483 8.58643L2.4094 4.58936C2.33972 4.09724 2.68195 3.64151 3.17404 3.57178C3.6661 3.50211 4.12181 3.84442 4.19162 4.33643L4.44455 6.12256C6.20003 3.85884 8.94616 2.40002 12.0344 2.3999Z" fill="currentColor"></path>',
      // Strat & planning
      "dc4061d3-57a0-4b07-a499-4849e44ff234":
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.524 2.34035C13.9204 2.33796 15.2968 2.65978 16.5476 3.28047C17.7989 3.90138 18.8889 4.80441 19.7317 5.9184C20.5746 7.03238 21.1471 8.32688 21.4044 9.69988C21.6616 11.0729 21.5965 12.4869 21.2141 13.8304C20.8317 15.1739 20.1425 16.4103 19.2009 17.4421C18.2592 18.4739 17.0908 19.2728 15.7877 19.7761C14.4846 20.2793 13.0825 20.473 11.6917 20.342C10.4677 20.2267 9.28188 19.8625 8.20648 19.2738L5.15573 20.7271C3.88047 21.3346 2.54906 20.0035 3.15632 18.7281L4.60918 15.6767C3.91966 14.4177 3.53981 13.0097 3.50459 11.5698C3.46527 9.96242 3.85682 8.37386 4.63859 6.96891C5.42037 5.56396 6.56388 4.39382 7.95047 3.57992C9.33663 2.76628 10.9167 2.33829 12.524 2.34035ZM15.7475 4.89287C14.7459 4.39586 13.6425 4.13825 12.5244 4.14034L12.5214 4.14035C11.2348 4.13849 9.97121 4.48097 8.86166 5.13226C7.75211 5.78354 6.83706 6.71989 6.21148 7.84413C5.5859 8.96838 5.27259 10.2396 5.30405 11.5257C5.33551 12.8119 5.7106 14.0663 6.39039 15.1586C6.55247 15.419 6.57074 15.7441 6.43887 16.021L5.14502 18.7384L7.86183 17.4442C8.13874 17.3123 8.46378 17.3305 8.72423 17.4925C9.67371 18.0831 10.7474 18.4451 11.8606 18.5499C12.9738 18.6548 14.0962 18.4998 15.1392 18.0969C16.1823 17.6941 17.1176 17.0546 17.8714 16.2287C18.6251 15.4028 19.1768 14.4131 19.4829 13.3377C19.7889 12.2622 19.8411 11.1304 19.6352 10.0314C19.4293 8.93232 18.9709 7.89613 18.2963 7.00443C17.6217 6.11273 16.7491 5.38989 15.7475 4.89287Z" fill="currentColor"></path>',
      // AI enhance
      "e1411071-77bd-4f8b-9ebe-cd624f5dfe7d":
        '<path d="M11.8916 21.8881C10.9556 21.8641 10.1876 21.2761 9.92361 20.4241L8.49561 15.6961C8.43561 15.4921 8.26761 15.4081 8.19561 15.3841L3.44361 13.8121C2.63961 13.5121 2.11161 12.7441 2.09961 11.8681C2.12361 10.9561 2.69961 10.1881 3.55161 9.9241L8.30361 8.4961C8.50761 8.4361 8.59161 8.2681 8.61561 8.1961L10.1636 3.5041C10.4396 2.6641 11.2196 2.1001 12.1076 2.1001H12.1316C13.0316 2.1241 13.7996 2.7001 14.0516 3.5521L15.4796 8.2801C15.5396 8.4841 15.7076 8.5681 15.7796 8.5921L20.4716 10.1401C21.3356 10.4401 21.8876 11.2081 21.8876 12.1081C21.8636 13.0201 21.2876 13.8001 20.4236 14.0521L15.6956 15.4801C15.5516 15.5281 15.4316 15.6361 15.3836 15.7801L13.8356 20.4721C13.5596 21.3121 12.7796 21.8761 11.8796 21.8761L11.8916 21.8881ZM4.13961 12.1561L8.78361 13.6921C9.49161 13.9441 10.0196 14.4961 10.2236 15.1921L11.6516 19.9201C11.6876 20.0281 11.7836 20.1001 11.8916 20.1001C12.0116 20.1001 12.0956 20.0401 12.1316 19.9321L13.6916 15.2161C13.9436 14.5081 14.4956 13.9801 15.1916 13.7761L19.9196 12.3481C20.0276 12.3121 20.0996 12.2161 20.0996 12.1081C20.0996 12.0001 20.0276 11.9041 19.9076 11.8561L15.2156 10.3081C14.5076 10.0561 13.9676 9.5041 13.7636 8.8081L12.3356 4.0801C12.2996 3.9841 12.2156 3.9121 12.1076 3.9001C11.9996 3.9001 11.9156 3.9721 11.8796 4.0681L10.3196 8.7841C10.0676 9.4921 9.51561 10.0201 8.81961 10.2241L4.07961 11.6521C3.98361 11.6881 3.89961 11.7841 3.89961 11.8921C3.89961 12.0001 3.97161 12.0961 4.06761 12.1321L4.13961 12.1561Z" fill="currentColor"></path>',
      // Training & Enable
      "fb316229-792d-4dac-9239-437dc8fc6b7d":
        '<path d="M14.9644 4.1999C14.7964 4.1999 14.6284 4.2239 14.4604 4.2599C13.9804 4.3679 13.4884 4.0679 13.3804 3.5879C13.2724 3.1079 13.5724 2.6159 14.0524 2.5079C14.3644 2.4359 14.6644 2.3999 14.9764 2.3999C16.0324 2.3999 17.0524 2.8199 17.7964 3.5639C18.5404 4.3079 18.9604 5.3279 18.9604 6.3839C18.9604 7.4399 18.5404 8.4599 17.7964 9.2039C17.0524 9.9479 16.0324 10.3679 14.9764 10.3679C14.6884 10.3679 14.4004 10.3439 14.1244 10.2839C13.6324 10.1759 13.3204 9.7079 13.4284 9.2159C13.5364 8.7239 14.0164 8.4119 14.4964 8.5199C14.6524 8.5559 14.8084 8.5679 14.9644 8.5679C15.5524 8.5679 16.1044 8.3399 16.5124 7.9319C16.9204 7.5239 17.1484 6.9719 17.1484 6.3839C17.1484 5.7959 16.9204 5.2439 16.5124 4.8359C16.1044 4.4279 15.5404 4.1999 14.9644 4.1999Z" fill="currentColor"></path><path d="M16.5004 10.7879C18.0724 11.1479 19.4764 12.0119 20.4844 13.2719V13.2599C21.4924 14.5199 22.0444 16.0799 22.0444 17.6879V19.7399C22.0444 20.2319 21.6364 20.6399 21.1444 20.6399H18.3964C17.9044 20.6399 17.4964 20.2319 17.4964 19.7399C17.4964 19.2479 17.9044 18.8399 18.3964 18.8399H20.2444V17.6879C20.2444 16.4879 19.8364 15.3239 19.0804 14.3879C18.3364 13.4519 17.2924 12.8039 16.1164 12.5399C15.6364 12.4319 15.3244 11.9519 15.4324 11.4719C15.5284 10.9919 16.0204 10.6799 16.5004 10.7879Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.47441 10.6319C7.60456 10.6335 5.80697 11.3773 4.47639 12.7079C3.14439 14.0399 2.40039 15.8279 2.40039 17.7119V19.7639C2.40039 20.2559 2.80839 20.6639 3.30039 20.6639H15.6484C16.1404 20.6639 16.5484 20.2559 16.5484 19.7639V17.7119C16.5484 15.8399 15.8044 14.0399 14.4724 12.7079C13.1418 11.3773 11.3562 10.6335 9.47441 10.6319ZM4.21239 18.8639V17.7119C4.21239 16.3079 4.76439 14.9759 5.76039 13.9799C6.74439 12.9959 8.08839 12.4319 9.49239 12.4319C10.8964 12.4319 12.2284 12.9839 13.2244 13.9799C14.2204 14.9759 14.7724 16.3079 14.7724 17.7119V18.8639H4.21239Z" fill="currentColor"></path><path d="M9.47441 10.6319L9.46839 10.6319H9.48039L9.47441 10.6319Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.95639 10.0679C7.46439 9.8639 7.03239 9.5759 6.66039 9.2039C6.28839 8.8319 6.00039 8.3879 5.79639 7.9079C5.60439 7.4279 5.49639 6.9119 5.49639 6.3839C5.49639 5.8559 5.59239 5.3399 5.79639 4.8599C6.00039 4.3679 6.28839 3.9359 6.66039 3.5639C7.03239 3.1919 7.47639 2.9039 7.95639 2.6999C8.43639 2.5079 8.95239 2.3999 9.48039 2.3999C10.0084 2.3999 10.5244 2.4959 11.0044 2.6999C11.4964 2.9039 11.9284 3.1919 12.3004 3.5639C12.6724 3.9359 12.9604 4.3799 13.1644 4.8599C13.3564 5.3399 13.4644 5.8559 13.4644 6.3839C13.4644 6.9119 13.3684 7.4279 13.1644 7.9079C12.9604 8.3999 12.6724 8.8319 12.3004 9.2039C11.9284 9.5759 11.4844 9.8639 11.0044 10.0679C10.5244 10.2599 10.0084 10.3679 9.48039 10.3679C8.95239 10.3679 8.43639 10.2719 7.95639 10.0679ZM7.93239 4.8359C7.74039 5.0399 7.57239 5.2799 7.46439 5.5439C7.35639 5.8079 7.29639 6.0959 7.29639 6.3839C7.29639 6.6719 7.35639 6.9599 7.46439 7.2239C7.57239 7.4879 7.72839 7.7399 7.93239 7.9319C8.13639 8.1239 8.37639 8.2919 8.64039 8.3999C8.90439 8.5079 9.19239 8.5679 9.48039 8.5679C9.76839 8.5679 10.0564 8.5079 10.3204 8.3999C10.5844 8.2919 10.8364 8.1359 11.0284 7.9319C11.2204 7.7279 11.3884 7.4879 11.4964 7.2239C11.6044 6.9599 11.6644 6.6719 11.6644 6.3839C11.6644 6.0959 11.6044 5.8079 11.4964 5.5439C11.3884 5.2799 11.2324 5.0279 11.0284 4.8359C10.8244 4.6439 10.5844 4.4759 10.3204 4.3679C10.0564 4.2599 9.76839 4.1999 9.48039 4.1999C9.19239 4.1999 8.90439 4.2599 8.64039 4.3679C8.37639 4.4759 8.12439 4.6319 7.93239 4.8359Z" fill="currentColor"></path>',
    };

    return `
        <svg class="mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          ${paths[id] ?? ""}
        </svg>`;
  });

  eleventyConfig.addFilter("daysSince", function (dateString) {
    const start = new Date(dateString);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  });

  // cache-busting timestamp filter e.g. '2025-06-24T21:12'
  // should be enough so that every build is cachebusted
  eleventyConfig.addFilter("cacheBusterTimestamp", function () {
    const now = new Date();
    return new Date().toISOString().substring(0, 16);
  });

  // Add currentTimestamp filter for sitemap
  eleventyConfig.addFilter("currentTimestamp", function () {
    return new Date().toISOString();
  });

  // Add dateToISO filter for sitemap
  eleventyConfig.addFilter("dateToISO", function (date) {
    return new Date(date).toISOString();
  });

  // Add custom filter to find app by ID
  eleventyConfig.addFilter("findAppById", function (apps, id) {
    return apps.find((app) => app.id === parseInt(id));
  });

  // Add custom shuffle filter (Fisher–Yates, non-mutating)
  eleventyConfig.addFilter("shuffle", function (array) {
    if (!Array.isArray(array)) return array;
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  });

  // Add custom filter to find vendor by ID
  eleventyConfig.addFilter("findVendorById", function (vendors, id) {
    return vendors.find((vendor) => vendor.id === parseInt(id));
  });

  // Add custom filter to find category by ID
  eleventyConfig.addFilter("findCategoryById", function (categories, id) {
    return categories.find((category) => category.id === parseInt(id));
  });

  // Add custom filter to format numbers with commas
  eleventyConfig.addFilter("numberFormat", function (num) {
    return parseInt(num).toLocaleString();
  });

  // Ratings need formatting as some of the data is dirty
  eleventyConfig.addFilter("formatRating", function (num) {
    num = parseFloat(num);
    return num.toFixed(1) < 5 ? num.toFixed(1) : Math.round(num).toString();
  });

  // Add
  eleventyConfig.addFilter(
    "averageInstallsPerMonth",
    function (installs, startDate) {
      const start = new Date(startDate);
      const end = new Date();

      // Validate dates
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date input");
      }

      // Ensure `installs` is a number
      const installsCount = parseInt(installs, 10);
      if (isNaN(installsCount)) {
        // throw new Error('Installs must be a number');
        return 0;
      }

      // Calculate total months (inclusive)
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1;

      // Avoid division by zero
      if (months <= 0) {
        return 0;
      }

      const monthly = installsCount / months;

      // Return average installs per month
      return monthly < 1 ? monthly.toFixed(1) : parseInt(monthly); //.toLocaleString();
    },
  );

  // Add custom filter to format dates
  eleventyConfig.addFilter("formatDate", function (dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  eleventyConfig.addFilter("sanitisePathname", function (pathname) {
    return (
      pathname
        // Replace non-alphanumeric characters (except '/') with spaces
        .replace(/[^a-zA-Z0-9/]/g, " ")
        // Replace multiple consecutive spaces with single spaces
        .replace(/\s+/g, "-")
        // Convert to lowercase
        .toLowerCase()
        // Trim leading and trailing spaces
        .trim()
    );
  });

  //
  eleventyConfig.addFilter("vendorMetaDescription", function (apps) {
    if (!apps || !apps.length) return "";

    let appDescriptions =
      "monday.com marketplace vendor for " +
      apps.map((app) => app?.name?.trim() || "App").join(", ");

    // return appDescriptions.length > 155
    //   ? appDescriptions.substring(0, 152) + '...'
    //   :
    return appDescriptions;
  });

  eleventyConfig.addFilter("removeAquisitionSource", function (apps, source) {
    return apps.filter((app) => app.acquisition_source !== source);
  });
  eleventyConfig.addFilter("removeAppsByIds", function (apps, ids) {
    return apps.filter((app) => !ids.includes(app.id.toString()));
  });

  eleventyConfig.addFilter("hostFromUrl", function (url) {
    try {
      const urlObj = new URL(url);
      return urlObj.host;
    } catch (error) {
      return url;
    }
  });

  // Add custom filter to filter apps by category
  eleventyConfig.addFilter("filterByCategory", function (apps, categoryId) {
    if (!Array.isArray(apps)) return [];
    return apps.filter(
      (app) =>
        app.marketplace_category_ids &&
        app.marketplace_category_ids.includes(parseInt(categoryId)),
    );
  });

  // Add custom filter to sort apps by install count
  eleventyConfig.addFilter("sortByInstalls", function (apps, installs) {
    if (!Array.isArray(apps)) return [];
    if (!installs || !Array.isArray(installs)) return apps;

    return [...apps].sort((a, b) => {
      const aInstalls = installs.find((i) => i.app_id === a.id)?.installs || 0;
      const bInstalls = installs.find((i) => i.app_id === b.id)?.installs || 0;
      return bInstalls - aInstalls;
    });
  });

  // Add custom filter to sort apps by creation date
  eleventyConfig.addFilter("sortByCreatedAt", function (apps) {
    return apps.sort((a, b) => {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);
      return bDate - aDate;
    });
  });

  // Add custom filter to sort apps by install count
  eleventyConfig.addFilter("sortByTotalInstalls", function (apps) {
    if (!Array.isArray(apps)) return [];

    return [...apps].sort((a, b) => {
      // Handle cases where installsDelta or sevenDays might be missing
      const aInstalls = a.installsDelta?.totalInstalls ?? -Infinity;
      const bInstalls = b.installsDelta?.totalInstalls ?? -Infinity;

      // Sort descending (higher numbers first)
      return bInstalls - aInstalls;
    });
  });

  // Add custom filter to sort apps by install count
  eleventyConfig.addFilter("sortByInstallsDeltaSevenDays", function (apps) {
    if (!Array.isArray(apps)) return [];

    return [...apps].sort((a, b) => {
      // Handle cases where installsDelta or sevenDays might be missing
      const aInstalls = a.installsDelta?.sevenDays ?? -Infinity;
      const bInstalls = b.installsDelta?.sevenDays ?? -Infinity;

      // Sort descending (higher numbers first)
      return bInstalls - aInstalls;
    });
  });

  // Add custom filter to sort apps by install count
  eleventyConfig.addFilter(
    "sortByInstallsDeltaThirtyDays",
    function (apps, installs) {
      if (!Array.isArray(apps)) return [];

      return [...apps].sort((a, b) => {
        // Handle cases where installsDelta or thirtyDays might be missing
        const aInstalls = a.installsDelta?.thirtyDays ?? -Infinity;
        const bInstalls = b.installsDelta?.thirtyDays ?? -Infinity;

        // Sort descending (higher numbers first)
        return bInstalls - aInstalls;
      });
    },
  );

  // Add custom filter to sort apps by install count
  eleventyConfig.addFilter(
    "sortByInstallsDeltaNinetyDays",
    function (apps, installs) {
      if (!Array.isArray(apps)) return [];

      return [...apps].sort((a, b) => {
        // Handle cases where installsDelta or ninetyDays might be missing
        const aInstalls = a.installsDelta?.ninetyDays ?? -Infinity;
        const bInstalls = b.installsDelta?.ninetyDays ?? -Infinity;

        // Sort descending (higher numbers first)
        return bInstalls - aInstalls;
      });
    },
  );

  // Add custom filter to sort arrays by property
  eleventyConfig.addFilter("sortBy", function (array, property) {
    return array.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  });

  // Add custom filter to filter apps by vendor
  eleventyConfig.addFilter("filterByVendor", function (apps, vendorId) {
    return apps.filter(
      (app) => app.marketplace_developer_id === parseInt(vendorId),
    );
  });

  // Add custom filter to sort vendors by app count
  eleventyConfig.addFilter(
    "sortVendorsByAppCount",
    function (vendors, marketplace) {
      return vendors
        .map((vendor) => {
          const appCount = marketplace.filter(
            (app) => app.marketplace_developer_id === parseInt(vendor.id),
          ).length;
          return { ...vendor, appCount };
        })
        .filter((vendor) => vendor.appCount > 0)
        .sort((a, b) => b.appCount - a.appCount);
    },
  );

  // Add custom filter to get app count for a vendor
  eleventyConfig.addFilter("getVendorAppCount", function (vendor, marketplace) {
    return marketplace.filter(
      (app) => app.marketplace_developer_id === parseInt(vendor.id),
    ).length;
  });

  // Add custom filter to sort vendors by install count
  eleventyConfig.addFilter("sortVendorsByInstalls", function (vendors) {
    return vendors
      .filter((vendor) => vendor.installs > 0)
      .sort((a, b) => b.installs - a.installs);
  });

  // Create a collection of app pages
  eleventyConfig.addCollection("appPages", function (collection) {
    return collection.getAll()[0].data.marketplace.map((app) => ({
      url: `/apps/${app.id}/`,
      data: { app },
    }));
  });

  // Custom filter to stringify objects
  eleventyConfig.addFilter("stringify", function (value) {
    return JSON.stringify(value, null, 2);
  });

  // Add custom filter to find ratings by app ID
  eleventyConfig.addFilter("findRatingById", function (ratings, appId) {
    if (!ratings) return null;
    return ratings.find((rating) => rating.app_id === parseInt(appId));
  });

  // Add custom filter to get compliance questions by type
  eleventyConfig.addFilter(
    "getComplianceQuestionsByType",
    function (complianceQuestions, type) {
      if (!complianceQuestions || !complianceQuestions.byType) return [];
      return complianceQuestions.byType[type] || [];
    },
  );

  // Filter plans to only those with the highest version number.
  // Plan IDs follow the pattern "{appId}-{versionId}-{planSlug}".
  eleventyConfig.addFilter("latestVersionPlans", function (plans) {
    if (!Array.isArray(plans) || plans.length === 0) return plans;
    const maxVersion = Math.max(
      ...plans.map((p) => parseInt((p.id || "").split("-")[1], 10) || 0),
    );
    return plans.filter(
      (p) => parseInt((p.id || "").split("-")[1], 10) === maxVersion,
    );
  });

  // Filter reviews to only APPROVED ones, safe for schema output.
  eleventyConfig.addFilter("approvedReviews", function (reviews) {
    if (!Array.isArray(reviews)) return [];
    return reviews.filter((r) => r.moderationStatus === "APPROVED");
  });

  // Extract the 4-digit year from an ISO date string.
  eleventyConfig.addFilter("yearFromDate", function (dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).getFullYear().toString();
  });

  // URL-encode a string (e.g. for sameAs URLs with spaces).
  eleventyConfig.addFilter("urlencode", function (str) {
    return encodeURIComponent(str || "");
  });

  // Add custom filter to concatenate arrays
  eleventyConfig.addFilter("concat", function (array, value) {
    return array.concat(value);
  });

  // Add custom filter function
  eleventyConfig.addFilter("filter", function (array, callback) {
    return array.filter(callback);
  });
  // Add custom filter function
  eleventyConfig.addFilter("limit", function (array, size) {
    return array.slice(0, size);
  });

  // Add isHostedOnMonday filter
  eleventyConfig.addFilter("isHostedOnMonday", function (app) {
    if (!app.compliance_answers) return false;

    const dataHostedOnMonday = Object.values(app.compliance_answers).some(
      (answer) => answer.dataHostingProvider === "monday",
    );

    const logHostedOnMonday = Object.values(app.compliance_answers).some(
      (answer) => answer.logHostingProvider === "monday",
    );

    return dataHostedOnMonday && logHostedOnMonday;
  });

  // Process CSS with PostCSS
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      return async () => {
        let output = await postcss([tailwindcss, autoprefixer]).process(
          inputContent,
          {
            from: inputPath,
          },
        );
        return output.css;
      };
    },
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/_data/json");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/json");
  eleventyConfig.addPassthroughCopy("src/d54ac31dd1524dc1934ba92fe211d1c6.txt");

  // Watch for changes in these folders
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/_data/json");
  eleventyConfig.addWatchTarget("src/images");
  eleventyConfig.addWatchTarget("src/js");
  eleventyConfig.addWatchTarget("src/json");
  eleventyConfig.addWatchTarget("src/d54ac31dd1524dc1934ba92fe211d1c6.txt");

  // // Minify HTML for production
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    // Only minify HTML files
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        keepClosingSlash: true,
      });
      return minified;
    }
    return content;
  });

  // // Minify JS for production
  eleventyConfig.on("afterBuild", async () => {
    const inputDir = "_site/js"; // Files have already been copied here
    const files = await readdir(inputDir);

    for (const file of files) {
      if (file.endsWith(".js")) {
        const filePath = join(inputDir, file);

        const code = await readFile(filePath, "utf-8");
        const minified = await minify(code);
        console.log(`[dsapps/minify-js] Minified ./${inputDir}/${file}`);

        await writeFile(filePath, minified.code, "utf-8");
      }
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
