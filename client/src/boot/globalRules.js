const validationRules = {
  requiredRule(val) {
    if (!val) {
      return "Mobile number is required";
    }
    return true;
  },
  mobileRule(val) {
    if (!/^\d{10}$/.test(val)) {
      return "Mobile number should be valid";
    }
    return true;
  },
};

export { validationRules };
