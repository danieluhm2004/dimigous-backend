const RegexUtil = {
  IDENTITY: /^(?=.*[a-z])[a-z0-9]{5,20}$/g,
  STUDENT_ID: /^[1-3][1-6]([0-9][1-9])$/g,
  PHONE: /^\d{2,3}-\d{3,4}-\d{4}$/g,
  USERNAME: /^[가-힣]{2,4}$/g,
  DEPARTMENT: /^(DC|WP|HD|EB)$/g,
  PASSWORD: '',
};

export default RegexUtil;
