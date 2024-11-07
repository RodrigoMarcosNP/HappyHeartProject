const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',  // Day as two digits (e.g., "06")
    month: 'short',   // Month in short form (e.g., "nov")
  };

  const formattedDate = new Date(date);
  const formatted = new Intl.DateTimeFormat('pt-BR', options).format(formattedDate);

  const [day, _, month] = formatted.split(' ');
  const monthDotStripe = month.split('.')[0];
  const monthFinal = monthDotStripe.charAt(0).toLocaleUpperCase() + monthDotStripe.slice(1); 
  console.log()
  const finalDate = `${day} ${monthFinal}`;

  return finalDate;
};

export default formatDate;
