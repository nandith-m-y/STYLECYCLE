// Brand-specific standard size measurement tables (in cm)
export const BRAND_SIZE_CHARTS = {
  Zara: {
    tops: [
      { size: "XS", chest: [84, 88], waist: [68, 72], shoulder: [40, 42], sleeve: [60, 61] },
      { size: "S",  chest: [89, 94], waist: [73, 78], shoulder: [42, 44], sleeve: [62, 63] },
      { size: "M",  chest: [95, 101], waist: [79, 85], shoulder: [44, 46], sleeve: [64, 65] },
      { size: "L",  chest: [102, 108], waist: [86, 92], shoulder: [46, 48], sleeve: [66, 67] },
      { size: "XL", chest: [109, 116], waist: [93, 100], shoulder: [48, 50], sleeve: [68, 69] },
      { size: "XXL",chest: [117, 124], waist: [101, 108], shoulder: [50, 52], sleeve: [70, 71] },
    ],
    bottoms: [
      { size: "XS", waist: [68, 72], hip: [88, 92], inseam: [78, 80] },
      { size: "S",  waist: [73, 78], hip: [93, 97], inseam: [80, 81] },
      { size: "M",  waist: [79, 84], hip: [98, 103], inseam: [81, 82] },
      { size: "L",  waist: [85, 91], hip: [104, 109], inseam: [82, 83] },
      { size: "XL", waist: [92, 98], hip: [110, 115], inseam: [83, 84] },
      { size: "XXL",waist: [99, 106], hip: [116, 122], inseam: [84, 85] },
    ]
  },
  "Levi's": {
    tops: [
      { size: "XS", chest: [82, 87], waist: [66, 71], shoulder: [41, 42], sleeve: [59, 61] },
      { size: "S",  chest: [88, 93], waist: [72, 77], shoulder: [43, 44], sleeve: [61, 63] },
      { size: "M",  chest: [94, 101], waist: [78, 85], shoulder: [45, 46], sleeve: [63, 65] },
      { size: "L",  chest: [102, 109], waist: [86, 93], shoulder: [47, 49], sleeve: [65, 67] },
      { size: "XL", chest: [110, 118], waist: [94, 102], shoulder: [50, 52], sleeve: [67, 69] },
      { size: "XXL",chest: [119, 127], waist: [103, 111], shoulder: [53, 55], sleeve: [69, 71] },
    ],
    bottoms: [
      { size: "XS", waist: [66, 71], hip: [86, 91], inseam: [76, 79] },
      { size: "S",  waist: [72, 76], hip: [92, 96], inseam: [79, 81] },
      { size: "M",  waist: [77, 83], hip: [97, 102], inseam: [81, 82] },
      { size: "L",  waist: [84, 90], hip: [103, 108], inseam: [82, 83] },
      { size: "XL", waist: [91, 97], hip: [109, 115], inseam: [83, 84] },
      { size: "XXL",waist: [98, 105], hip: [116, 123], inseam: [84, 85] },
    ]
  },
  "H&M": {
    tops: [
      { size: "XS", chest: [84, 88], waist: [72, 76], shoulder: [41, 42], sleeve: [61, 62] },
      { size: "S",  chest: [88, 96], waist: [76, 84], shoulder: [43, 44], sleeve: [62, 63] },
      { size: "M",  chest: [96, 104], waist: [84, 92], shoulder: [45, 46], sleeve: [64, 65] },
      { size: "L",  chest: [104, 112], waist: [92, 100], shoulder: [47, 48], sleeve: [66, 67] },
      { size: "XL", chest: [112, 120], waist: [100, 108], shoulder: [49, 51], sleeve: [68, 69] },
      { size: "XXL",chest: [120, 128], waist: [108, 116], shoulder: [52, 54], sleeve: [70, 71] },
    ],
    bottoms: [
      { size: "XS", waist: [70, 74], hip: [86, 90], inseam: [78, 80] },
      { size: "S",  waist: [75, 80], hip: [91, 96], inseam: [80, 81] },
      { size: "M",  waist: [81, 86], hip: [97, 102], inseam: [81, 82] },
      { size: "L",  waist: [87, 93], hip: [103, 108], inseam: [82, 83] },
      { size: "XL", waist: [94, 100], hip: [109, 115], inseam: [83, 84] },
      { size: "XXL",waist: [101, 108], hip: [116, 122], inseam: [84, 85] },
    ]
  },
  "Massimo Dutti": {
    tops: [
      { size: "XS", chest: [86, 90], waist: [70, 74], shoulder: [42, 43], sleeve: [61, 62] },
      { size: "S",  chest: [91, 95], waist: [75, 79], shoulder: [43, 45], sleeve: [63, 64] },
      { size: "M",  chest: [96, 101], waist: [80, 85], shoulder: [45, 47], sleeve: [64, 66] },
      { size: "L",  chest: [102, 108], waist: [86, 92], shoulder: [47, 49], sleeve: [66, 68] },
      { size: "XL", chest: [109, 115], waist: [93, 99], shoulder: [49, 51], sleeve: [68, 70] },
      { size: "XXL",chest: [116, 123], waist: [100, 107], shoulder: [51, 53], sleeve: [70, 72] },
    ],
    bottoms: [
      { size: "XS", waist: [71, 75], hip: [89, 93], inseam: [79, 81] },
      { size: "S",  waist: [76, 80], hip: [94, 98], inseam: [81, 82] },
      { size: "M",  waist: [81, 86], hip: [99, 104], inseam: [82, 83] },
      { size: "L",  waist: [87, 92], hip: [105, 110], inseam: [83, 84] },
      { size: "XL", waist: [93, 99], hip: [111, 116], inseam: [84, 85] },
      { size: "XXL",waist: [100, 107], hip: [117, 123], inseam: [85, 86] },
    ]
  }
};

export const FIT_PREFERENCES = [
  { id: "Slim", label: "Slim Fit", desc: "Closer to body, tailored contours", offset: -2 },
  { id: "Regular", label: "Regular Fit", desc: "Classic proportioned silhouette", offset: 0 },
  { id: "Relaxed", label: "Relaxed Fit", desc: "Roomy, breathable everyday ease", offset: 3 },
  { id: "Oversized", label: "Oversized Street", desc: "Fashion-forward dropped drape", offset: 6 }
];
