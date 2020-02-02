const RegexUtil = {
  OBJECT_ID: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/gi,
  IDENTITY: /^(?=.*[a-z])[a-z0-9]{5,20}$/g,
  STUDENT_ID: /^[1-3][1-6]([0-9][0-9])$/g,
  PHONE: /^\d{2,3}-\d{3,4}-\d{4}$/g,
  USERNAME: /^[가-힣]{2,4}$/g,
  PASSWORD: /^.{6,}$/igm,
};

export default RegexUtil;
