import { FC } from 'react';

export const ComplexTable: FC = () => {
  return (
    <table id='example' className='w-[100%] text-sm text-left rtl:text-right overflow-auto'>
      <thead className='text-xs uppercase text-gray-300'>
        <tr className='border-b bg-gray-800 border-gray-700'>
          <th rowSpan={2} className='px-6 py-3 border-r border-gray-700'>
            Name
          </th>
          <th colSpan={2} className='px-6 py-3 border-r border-gray-700'>
            Position
          </th>
          <th colSpan={3} className='px-6 py-3'>
            Contact
          </th>
        </tr>
        <tr className='border-b bg-gray-800 border-gray-700'>
          <th colSpan={3} data-dt-order='disable' className='px-6 py-3 border-r border-gray-700'>
            HR info
          </th>
          <th colSpan={2} className='px-6 py-3'>
            Direct
          </th>
        </tr>
        <tr className='border-b bg-gray-700 border-gray-500'>
          <th className='px-6 py-3 border-r border-gray-600'>Name</th>
          <th className='px-6 py-3 border-r border-gray-600'>Position</th>
          <th className='px-6 py-3 border-r border-gray-600'>Salary</th>
          <th className='px-6 py-3 border-r border-gray-600'>Office</th>
          <th className='px-6 py-3 border-r border-gray-600'>Extn.</th>
          <th className='px-6 py-3 border-r border-gray-600'>E-mail</th>
        </tr>
      </thead>
      <tbody className='text-xs bg-gray-500 text-gray-100'>
        <tr>
          <td className='px-6 py-3'>Tiger Nixon</td>
          <td className='px-6 py-3'>System Architect</td>
          <td className='px-6 py-3'>$320,800</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>5421</td>
          <td className='px-6 py-3'>t.nixon@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Garrett Winters</td>
          <td className='px-6 py-3'>Accountant</td>
          <td className='px-6 py-3'>$170,750</td>
          <td className='px-6 py-3'>Tokyo</td>
          <td className='px-6 py-3'>8422</td>
          <td className='px-6 py-3'>g.winters@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Ashton Cox</td>
          <td className='px-6 py-3'>Junior Technical Author</td>
          <td className='px-6 py-3'>$86,000</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>1562</td>
          <td className='px-6 py-3'>a.cox@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Cedric Kelly</td>
          <td className='px-6 py-3'>Senior Javascript Developer</td>
          <td className='px-6 py-3'>$433,060</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>6224</td>
          <td className='px-6 py-3'>c.kelly@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Airi Satou</td>
          <td className='px-6 py-3'>Accountant</td>
          <td className='px-6 py-3'>$162,700</td>
          <td className='px-6 py-3'>Tokyo</td>
          <td className='px-6 py-3'>5407</td>
          <td className='px-6 py-3'>a.satou@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Brielle Williamson</td>
          <td className='px-6 py-3'>Integration Specialist</td>
          <td className='px-6 py-3'>$372,000</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>4804</td>
          <td className='px-6 py-3'>b.williamson@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Herrod Chandler</td>
          <td className='px-6 py-3'>Sales Assistant</td>
          <td className='px-6 py-3'>$137,500</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>9608</td>
          <td className='px-6 py-3'>h.chandler@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Rhona Davidson</td>
          <td className='px-6 py-3'>Integration Specialist</td>
          <td className='px-6 py-3'>$327,900</td>
          <td className='px-6 py-3'>Tokyo</td>
          <td className='px-6 py-3'>6200</td>
          <td className='px-6 py-3'>r.davidson@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Colleen Hurst</td>
          <td className='px-6 py-3'>Javascript Developer</td>
          <td className='px-6 py-3'>$205,500</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>2360</td>
          <td className='px-6 py-3'>c.hurst@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Sonya Frost</td>
          <td className='px-6 py-3'>Software Engineer</td>
          <td className='px-6 py-3'>$103,600</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>1667</td>
          <td className='px-6 py-3'>s.frost@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Jena Gaines</td>
          <td className='px-6 py-3'>Office Manager</td>
          <td className='px-6 py-3'>$90,560</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>3814</td>
          <td className='px-6 py-3'>j.gaines@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Quinn Flynn</td>
          <td className='px-6 py-3'>Support Lead</td>
          <td className='px-6 py-3'>$342,000</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>9497</td>
          <td className='px-6 py-3'>q.flynn@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Charde Marshall</td>
          <td className='px-6 py-3'>Regional Director</td>
          <td className='px-6 py-3'>$470,600</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>6741</td>
          <td className='px-6 py-3'>c.marshall@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Haley Kennedy</td>
          <td className='px-6 py-3'>Senior Marketing Designer</td>
          <td className='px-6 py-3'>$313,500</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>3597</td>
          <td className='px-6 py-3'>h.kennedy@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Tatyana Fitzpatrick</td>
          <td className='px-6 py-3'>Regional Director</td>
          <td className='px-6 py-3'>$385,750</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>1965</td>
          <td className='px-6 py-3'>t.fitzpatrick@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Michael Silva</td>
          <td className='px-6 py-3'>Marketing Designer</td>
          <td className='px-6 py-3'>$198,500</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>1581</td>
          <td className='px-6 py-3'>m.silva@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Paul Byrd</td>
          <td className='px-6 py-3'>Chief Financial Officer (CFO)</td>
          <td className='px-6 py-3'>$725,000</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>3059</td>
          <td className='px-6 py-3'>p.byrd@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Gloria Little</td>
          <td className='px-6 py-3'>Systems Administrator</td>
          <td className='px-6 py-3'>$237,500</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>1721</td>
          <td className='px-6 py-3'>g.little@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Bradley Greer</td>
          <td className='px-6 py-3'>Software Engineer</td>
          <td className='px-6 py-3'>$132,000</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>2558</td>
          <td className='px-6 py-3'>b.greer@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Dai Rios</td>
          <td className='px-6 py-3'>Personnel Lead</td>
          <td className='px-6 py-3'>$217,500</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>2290</td>
          <td className='px-6 py-3'>d.rios@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Jenette Caldwell</td>
          <td className='px-6 py-3'>Development Lead</td>
          <td className='px-6 py-3'>$345,000</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>1937</td>
          <td className='px-6 py-3'>j.caldwell@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Yuri Berry</td>
          <td className='px-6 py-3'>Chief Marketing Officer (CMO)</td>
          <td className='px-6 py-3'>$675,000</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>6154</td>
          <td className='px-6 py-3'>y.berry@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Caesar Vance</td>
          <td className='px-6 py-3'>Pre-Sales Support</td>
          <td className='px-6 py-3'>$106,450</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>8330</td>
          <td className='px-6 py-3'>c.vance@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Doris Wilder</td>
          <td className='px-6 py-3'>Sales Assistant</td>
          <td className='px-6 py-3'>$85,600</td>
          <td className='px-6 py-3'>Sydney</td>
          <td className='px-6 py-3'>3023</td>
          <td className='px-6 py-3'>d.wilder@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Angelica Ramos</td>
          <td className='px-6 py-3'>Chief Executive Officer (CEO)</td>
          <td className='px-6 py-3'>$1,200,000</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>5797</td>
          <td className='px-6 py-3'>a.ramos@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Gavin Joyce</td>
          <td className='px-6 py-3'>Developer</td>
          <td className='px-6 py-3'>$92,575</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>8822</td>
          <td className='px-6 py-3'>g.joyce@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Jennifer Chang</td>
          <td className='px-6 py-3'>Regional Director</td>
          <td className='px-6 py-3'>$357,650</td>
          <td className='px-6 py-3'>Singapore</td>
          <td className='px-6 py-3'>9239</td>
          <td className='px-6 py-3'>j.chang@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Brenden Wagner</td>
          <td className='px-6 py-3'>Software Engineer</td>
          <td className='px-6 py-3'>$206,850</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>1314</td>
          <td className='px-6 py-3'>b.wagner@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Fiona Green</td>
          <td className='px-6 py-3'>Chief Operating Officer (COO)</td>
          <td className='px-6 py-3'>$850,000</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>2947</td>
          <td className='px-6 py-3'>f.green@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Shou Itou</td>
          <td className='px-6 py-3'>Regional Marketing</td>
          <td className='px-6 py-3'>$163,000</td>
          <td className='px-6 py-3'>Tokyo</td>
          <td className='px-6 py-3'>8899</td>
          <td className='px-6 py-3'>s.itou@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Michelle House</td>
          <td className='px-6 py-3'>Integration Specialist</td>
          <td className='px-6 py-3'>$95,400</td>
          <td className='px-6 py-3'>Sydney</td>
          <td className='px-6 py-3'>2769</td>
          <td className='px-6 py-3'>m.house@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Suki Burks</td>
          <td className='px-6 py-3'>Developer</td>
          <td className='px-6 py-3'>$114,500</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>6832</td>
          <td className='px-6 py-3'>s.burks@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Prescott Bartlett</td>
          <td className='px-6 py-3'>Technical Author</td>
          <td className='px-6 py-3'>$145,000</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>3606</td>
          <td className='px-6 py-3'>p.bartlett@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Gavin Cortez</td>
          <td className='px-6 py-3'>Team Leader</td>
          <td className='px-6 py-3'>$235,500</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>2860</td>
          <td className='px-6 py-3'>g.cortez@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Martena Mccray</td>
          <td className='px-6 py-3'>Post-Sales support</td>
          <td className='px-6 py-3'>$324,050</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>8240</td>
          <td className='px-6 py-3'>m.mccray@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Unity Butler</td>
          <td className='px-6 py-3'>Marketing Designer</td>
          <td className='px-6 py-3'>$85,675</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>5384</td>
          <td className='px-6 py-3'>u.butler@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Howard Hatfield</td>
          <td className='px-6 py-3'>Office Manager</td>
          <td className='px-6 py-3'>$164,500</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>7031</td>
          <td className='px-6 py-3'>h.hatfield@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Hope Fuentes</td>
          <td className='px-6 py-3'>Secretary</td>
          <td className='px-6 py-3'>$109,850</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>6318</td>
          <td className='px-6 py-3'>h.fuentes@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Vivian Harrell</td>
          <td className='px-6 py-3'>Financial Controller</td>
          <td className='px-6 py-3'>$452,500</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>9422</td>
          <td className='px-6 py-3'>v.harrell@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Timothy Mooney</td>
          <td className='px-6 py-3'>Office Manager</td>
          <td className='px-6 py-3'>$136,200</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>7580</td>
          <td className='px-6 py-3'>t.mooney@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Jackson Bradshaw</td>
          <td className='px-6 py-3'>Director</td>
          <td className='px-6 py-3'>$645,750</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>1042</td>
          <td className='px-6 py-3'>j.bradshaw@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Olivia Liang</td>
          <td className='px-6 py-3'>Support Engineer</td>
          <td className='px-6 py-3'>$234,500</td>
          <td className='px-6 py-3'>Singapore</td>
          <td className='px-6 py-3'>2120</td>
          <td className='px-6 py-3'>o.liang@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Bruno Nash</td>
          <td className='px-6 py-3'>Software Engineer</td>
          <td className='px-6 py-3'>$163,500</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>6222</td>
          <td className='px-6 py-3'>b.nash@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Sakura Yamamoto</td>
          <td className='px-6 py-3'>Support Engineer</td>
          <td className='px-6 py-3'>$139,575</td>
          <td className='px-6 py-3'>Tokyo</td>
          <td className='px-6 py-3'>9383</td>
          <td className='px-6 py-3'>s.yamamoto@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Thor Walton</td>
          <td className='px-6 py-3'>Developer</td>
          <td className='px-6 py-3'>$98,540</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>8327</td>
          <td className='px-6 py-3'>t.walton@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Finn Camacho</td>
          <td className='px-6 py-3'>Support Engineer</td>
          <td className='px-6 py-3'>$87,500</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>2927</td>
          <td className='px-6 py-3'>f.camacho@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Serge Baldwin</td>
          <td className='px-6 py-3'>Data Coordinator</td>
          <td className='px-6 py-3'>$138,575</td>
          <td className='px-6 py-3'>Singapore</td>
          <td className='px-6 py-3'>8352</td>
          <td className='px-6 py-3'>s.baldwin@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Zenaida Frank</td>
          <td className='px-6 py-3'>Software Engineer</td>
          <td className='px-6 py-3'>$125,250</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>7439</td>
          <td className='px-6 py-3'>z.frank@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Zorita Serrano</td>
          <td className='px-6 py-3'>Software Engineer</td>
          <td className='px-6 py-3'>$115,000</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>4389</td>
          <td className='px-6 py-3'>z.serrano@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Jennifer Acosta</td>
          <td className='px-6 py-3'>Junior Javascript Developer</td>
          <td className='px-6 py-3'>$75,650</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>3431</td>
          <td className='px-6 py-3'>j.acosta@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Cara Stevens</td>
          <td className='px-6 py-3'>Sales Assistant</td>
          <td className='px-6 py-3'>$145,600</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>3990</td>
          <td className='px-6 py-3'>c.stevens@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Hermione Butler</td>
          <td className='px-6 py-3'>Regional Director</td>
          <td className='px-6 py-3'>$356,250</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>1016</td>
          <td className='px-6 py-3'>h.butler@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Lael Greer</td>
          <td className='px-6 py-3'>Systems Administrator</td>
          <td className='px-6 py-3'>$103,500</td>
          <td className='px-6 py-3'>London</td>
          <td className='px-6 py-3'>6733</td>
          <td className='px-6 py-3'>l.greer@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Jonas Alexander</td>
          <td className='px-6 py-3'>Developer</td>
          <td className='px-6 py-3'>$86,500</td>
          <td className='px-6 py-3'>San Francisco</td>
          <td className='px-6 py-3'>8196</td>
          <td className='px-6 py-3'>j.alexander@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Shad Decker</td>
          <td className='px-6 py-3'>Regional Director</td>
          <td className='px-6 py-3'>$183,000</td>
          <td className='px-6 py-3'>Edinburgh</td>
          <td className='px-6 py-3'>6373</td>
          <td className='px-6 py-3'>s.decker@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Michael Bruce</td>
          <td className='px-6 py-3'>Javascript Developer</td>
          <td className='px-6 py-3'>$183,000</td>
          <td className='px-6 py-3'>Singapore</td>
          <td className='px-6 py-3'>5384</td>
          <td className='px-6 py-3'>m.bruce@datatables.net</td>
        </tr>
        <tr>
          <td className='px-6 py-3'>Donna Snider</td>
          <td className='px-6 py-3'>Customer Support</td>
          <td className='px-6 py-3'>$112,000</td>
          <td className='px-6 py-3'>New York</td>
          <td className='px-6 py-3'>4226</td>
          <td className='px-6 py-3'>d.snider@datatables.net</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Office</th>
          <th>Extn.</th>
          <th>E-mail</th>
        </tr>
      </tfoot>
    </table>
  );
};
