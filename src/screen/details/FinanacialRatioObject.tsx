export interface BasicIndexType {
    code: string,
    name : string,
    explain: string
}

export const FinancialRatios = {
    percentDay : {
        code : "% Thay đổi trong tuần",
        name : "% Thay đổi trong ngày",
        explain: "Được tính bằng phần trăm sự chênh lệch giá mở cửa và đóng cửa trong ngày."
    },
    percentWeek : {
        code : "% Thay đổi trong tuần",
        name : "% Thay đổi trong tuần",
        explain: "Được tính bằng phần trăm sự chênh lệch giữa giá đóng cửa hiện tại và giá đóng cửa đầu tuần." 
    },
    percentMonth : {
        code : "% Thay đổi trong tháng",
        name : "% Thay đổi trong tháng",
        explain : "Được tính bằng phần trăm sự chênh lệch giữa giá đóng của hiện tại và giá đóng cửa đầu tháng."
    },
    priceToEarning : {
        code : "P/E",
        name : "Price To Earning",
        explain: "- Price To Earning thường được viết tắt là P/E hoặc PE, và nó đo lường mức độ đắt đỏ của một cổ phiếu hoặc thị trường chứng khoán.\n- Cụ thể, Price To Earning là tỷ lệ giữa giá cổ phiếu hiện tại và lợi nhuận trên mỗi cổ phiếu (EPS - Earnings Per Share).\n- Một P/E ratio cao có thể cho thấy thị trường đang đánh giá cao tiềm năng tăng trưởng của doanh nghiệp hoặc có thể là dấu hiệu của một cổ phiếu đắt đỏ. Ngược lại, một P/E ratio thấp có thể cho thấy cơ hội đầu tư tốt hơn, nhưng cũng có thể là dấu hiệu của sự lo lắng về tương lai của doanh nghiệp."
    },
    priceToBook : {
        code: "P/B",
        name: "Price to Book Ratio",
        explain: "Tỷ lệ Giá/Giá sổ sách (P/B) đánh giá giá trị thị trường của một công ty so với giá trị sổ cái trên mỗi cổ phiếu. P/B thấp thường cho thấy cổ phiếu có thể đang được định giá thấp hơn giá trị tài sản, trong khi P/B cao có thể là dấu hiệu của sự đánh giá cao hoặc triển vọng tích cực. Đánh giá tài sản và nợ của công ty là một phần quan trọng trong việc sử dụng P/B Ratio."
    },
    dividend : {
        code: "Tỉ lệ cổ tức",
        name: "Tỉ lệ cổ tức",
        explain: "- Tỉ lệ cổ tức, còn được gọi là tỷ lệ chi trả, là một chỉ số quan trọng trong lĩnh vực tài chính, phản ánh mức độ mà doanh nghiệp chia sẻ lợi nhuận với các cổ đông. Đây chính là tỷ lệ phần trăm của thu nhập công ty mà được trả cho cổ đông dưới dạng cổ tức.\n- Tỉ lệ cổ tức có thể được tính bằng cách chia cổ tức trên mỗi đơn vị cổ phiếu cho lợi nhuận trên mỗi đơn vị cổ phiếu (EPS)"
    },
    valueBeforeEbitda: {
        code :"",
        name : "",
        explain: ""
    },
    roe : {
        code: "ROE",
        name: "Return on Equity",
        explain: "- ROE, hay Tỷ suất lợi nhuận trên vốn chủ sở hữu, là một chỉ số quan trọng đo lường khả năng sinh lời của một công ty bằng cách so sánh lợi nhuận thu được với vốn mà cổ đông đã đầu tư.\n- Một ROE cao thường tượng trưng cho hiệu suất tài chính tích cực và khả năng tạo ra giá trị từ vốn chủ sở hữu. Ngược lại, ROE thấp có thể là dấu hiệu của vấn đề trong quản lý hoặc hiệu suất kinh doanh kém. Điều này làm cho ROE trở thành một công cụ đánh giá quan trọng cho nhà đầu tư và những người quan tâm đến sức khỏe tài chính của công ty."
    },
    roa : {
        code: "ROA",
        name: "Return on Assets",
        explain : "ROA, hay Tỷ suất lợi nhuận trên Tài sản, đo lường khả năng sinh lời của một công ty bằng cách so sánh lợi nhuận thu được với tổng giá trị tài sản. ROA cao tượng trưng cho hiệu suất quản lý tài sản tích cực và khả năng tạo ra lợi nhuận hiệu quả từ tài sản. Ngược lại, ROA thấp có thể là dấu hiệu của quản lý tài sản không hiệu quả hoặc hiệu suất kinh doanh kém."
    },
    daysReceivable : {
        code : "Số ngày phải thu",
        name : "Days Receivable",
        explain: "Days Receivable, hay số ngày phải thu, là một chỉ số tài chính đo lường thời gian mà một công ty mất để thu hồi tiền từ khách hàng sau khi đã bán hàng hoặc cung cấp dịch vụ. Chỉ số này giúp đánh giá hiệu suất quản lý và khả năng quản lý nợ của doanh nghiệp. Days Receivable được tính bằng cách chia tổng số nợ phải thu cho doanh nghiệp cho doanh số bán hàng hàng ngày và sau đó nhân 365 (số ngày trong một năm)."
    },
    daysInventory : {
        code: "Số ngày tồn kho",
        name: " Days Inventory",
        explain: "- Days Inventory, hay số ngày tồn kho, là một chỉ số tài chính đo lường thời gian mà một công ty mất để bán hết tồn kho hiện tại. Chỉ số này được tính bằng cách chia tổng giá trị tồn kho cho doanh số bán hàng hàng ngày và sau đó nhân 365 (số ngày trong một năm).\n- Nếu một công ty có Days Inventory là 60 ngày, điều này có nghĩa là trung bình mất 60 ngày để họ bán hết tồn kho. Một Days Inventory thấp thường tốt vì nó cho thấy công ty có khả năng quản lý tồn kho một cách hiệu quả, giảm rủi ro hết hạn và chi phí lưu trữ. Ngược lại, Days Inventory cao có thể là dấu hiệu của vấn đề trong quản lý tồn kho hoặc chiến lược bán hàng không hiệu quả."
    },
    daysPayable : {
        code : "Số ngày phải trả",
        name : "Days Payable",
        explain: "- Days Payable, hay số ngày phải trả, là một chỉ số tài chính đo lường thời gian mà một công ty mất để thanh toán các khoản nợ đối với nhà cung cấp sau khi đã nhận hàng hoặc dịch vụ. Chỉ số này giúp đánh giá khả năng quản lý tài chính và chiến lược thanh toán của doanh nghiệp. Days Payable được tính bằng cách chia tổng giá trị các khoản nợ phải trả cho doanh nghiệp cho doanh số mua hàng hàng ngày và sau đó nhân 365 (số ngày trong một năm).\n -Chẳng hạn, nếu một công ty có Days Payable là 45 ngày, điều này có nghĩa là trung bình mất 45 ngày để họ thanh toán các khoản nợ đối với nhà cung cấp sau khi nhận hàng. Một Days Payable cao có thể là dấu hiệu của chiến lược thanh toán hiệu quả và có thể giúp công ty duy trì dòng tiền tích cực. Ngược lại, Days Payable thấp có thể tạo áp lực tài chính và yêu cầu chi trả nhanh chóng."
    },
    ebitOnInterest : {
        code : "EBIT",
        name : "Earnings before interest and taxes",
        explain: "- EBIT, hay còn được gọi là Earning Before Interest and Taxes on Interest, là một chỉ số tài chính đo lường khả năng của một công ty tạo ra lợi nhuận trước khi tính thuế và lãi suất. Chỉ số này thường được sử dụng để đánh giá khả năng thanh toán lãi suất của doanh nghiệp.\n- Công thức tính EBIT on Interest là: EBIT on Interest = (EBIT / Lãi suất tổng cộng) * 100\n- Nếu EBIT on Interest cao, điều này có thể cho thấy doanh nghiệp có khả năng tạo ra lợi nhuận đủ lớn để chi trả lãi suất. Ngược lại, nếu chỉ số này thấp, có thể là dấu hiệu của một tình hình tài chính không ổn định hoặc có khả năng thanh toán lãi suất kém."
    },
    earningPerShare: {
        code: "EPS",
        name : "Earnings Per Share",
        explain: "- Earnings Per Share (EPS), hay còn được gọi là Lợi nhuận trên Mỗi Cổ Phiếu, là một chỉ số tài chính quan trọng đo lường lợi nhuận trung bình mà mỗi cổ đông của công ty có thể mong đợi nhận được từ cổ phiếu mà họ nắm giữ. EPS thường được sử dụng để đánh giá hiệu suất tài chính của một công ty và là một trong những chỉ số quan trọng trong phân tích cổ phiếu.\n -Công thức tính EPS là: EPS = (Lợi nhuận sau thuế - Cổ tức ưu đãi) / Số lượng cổ phiếu trung bình\n -EPS càng cao, càng cho thấy doanh nghiệp đang tạo ra nhiều lợi nhuận trên mỗi cổ phiếu, điều này có thể làm tăng giá trị cổ phiếu và thu hút các nhà đầu tư. Ngược lại, EPS thấp có thể là dấu hiệu của hiệu suất kém và có thể ảnh hưởng đến định giá cổ phiếu trên thị trường."
    },
    bookValuePerShare: {
        code: "BVPS",
        name: "Book Value Per Share",
        explain: "- Giá trị sổ sách trên mỗi cổ phiếu (BVPS) là chỉ số tài chính đo lường giá trị sổ sách trung bình mà mỗi cổ đông có thể mong đợi nhận được trên mỗi cổ phiếu nếu công ty bị thanh lý.\n- BVPS được tính bằng cách chia giá trị tài sản ròng của công ty cho số lượng cổ phiếu trung bình.\n- Một BVPS cao thường cho thấy giá trị tài sản ròng của công ty đang cao, có thể làm tăng giá trị cổ phiếu và thu hút sự quan tâm của nhà đầu tư."
    },    
    interestMargin: {
        code: "IM",
        name: "Interest Margin",
        explain: "- Lãi suất ròng (IM) là chỉ số tài chính đo lường lợi nhuận mà một tổ chức tài chính hay ngân hàng có được từ việc cung cấp các sản phẩm và dịch vụ tài chính, đặc biệt là từ lãi suất.\n- IM thường được tính bằng cách chia lợi nhuận từ lãi suất cho tổng doanh thu từ lãi suất.\n- Một IM cao thường cho thấy ngân hàng hoặc tổ chức tài chính đang có hiệu suất lợi nhuận cao từ hoạt động cung cấp dịch vụ tài chính."
    
    },
    nonInterestOnToi: {
        code: "NITOI",
        name: "Non-Interest on Total Operating Income",
        explain: "- Tổng thu nhập không lãi trên tổng tài sản (NITOI) là chỉ số đo lường tỷ lệ chi phí không phải lãi suất trên tổng doanh thu hoạt động của một tổ chức tài chính hay ngân hàng.\n- NITOI thường được tính bằng cách chia tổng chi phí không phải lãi suất cho tổng doanh thu hoạt động.\n- Một NITOI thấp thường cho thấy hiệu suất quản lý chi phí tốt, còn NITOI cao có thể là dấu hiệu của chi phí quản lý không hiệu quả."
    
    },
    badDebtPercentage: {
        code: "BDP",
        name: "Bad Debt Percentage",
        explain: "- Bad Debt Percentage (BDP) là tỷ lệ nợ xấu, đo lường mức độ rủi ro mà một tổ chức tài chính hay ngân hàng đang phải đối mặt do nợ không trả được của khách hàng.\n- BDP thường được tính bằng cách chia tổng nợ xấu cho tổng nợ.\n- Một BDP thấp thường cho thấy rủi ro tín dụng thấp và quản lý nợ tốt."
    
    },
    provisionOnBadDebt: {
        code: "PBD",
        name: "Provision on Bad Debt",
        explain: "- Dự phòng nợ xấu (PBD) là số tiền mà một tổ chức tài chính hay ngân hàng dự trữ để đối phó với rủi ro nợ xấu trong tương lai.\n- PBD thường được tính bằng cách dự trữ một phần nhỏ của lợi nhuận hoặc doanh thu để tạo ra quỹ dự phòng cho rủi ro tín dụng.\n- Một PBD cao có thể là dấu hiệu của sự cẩn trọng và quản lý rủi ro tốt."
    },
    costOfFinancing: {
        code: "COF",
        name: "Cost of Financing",
        explain: "- Chi phí tài chính (COF) là chi phí mà một tổ chức tài chính hay ngân hàng phải chi trả để có được nguồn vốn và thực hiện các hoạt động tài chính của mình.\n- COF thường bao gồm lãi suất trả cho người vay, chi phí hoạt động tín dụng, và các chi phí khác liên quan đến việc huy động và quản lý vốn.\n- Một COF thấp thường làm tăng lợi nhuận ròng và hiệu suất tài chính của tổ chức."
    
    },
    equityOnTotalAsset: {
        code: "ETA",
        name: "Equity on Total Asset",
        explain: "- Equity on Total Asset (ETA) là tỷ lệ giữa vốn chủ sở hữu của một tổ chức tài chính hay ngân hàng và tổng tài sản.\n- ETA thường được tính bằng cách chia vốn chủ sở hữu cho tổng tài sản và nhân 100 để biểu diễn dưới dạng phần trăm.\n- Một ETA cao thường cho thấy tỷ lệ vốn chủ sở hữu đối với tổng tài sản là lớn, điều này có thể làm tăng sự tin tưởng từ phía cổ đông và nhà đầu tư."
    
    },
    equityOnLoan: {
        code: "EOL",
        name: "Equity on Loan",
        explain: "- Vốn cổ phần trên dư nợ cho vay (EOL) là tỷ lệ giữa vốn chủ sở hữu của một tổ chức tài chính hay ngân hàng và tổng số tiền cho vay.\n- EOL thường được tính bằng cách chia vốn chủ sở hữu cho tổng số tiền cho vay và nhân 100 để biểu diễn dưới dạng phần trăm.\n- Một EOL cao thường cho thấy tỷ lệ vốn chủ sở hữu đối với tổng số tiền cho vay là lớn, có thể là dấu hiệu của sự ổn định và an toàn trong hoạt động cho vay."
    },
    
    costToIncome: {
        code: "CTI",
        name: "Cost to Income",
        explain: "- Chi phí so với Thu nhập (CTI) là tỷ lệ giữa chi phí hoạt động và doanh thu hoạt động của một tổ chức tài chính. Để tính CTI, ta chia tổng chi phí hoạt động cho tổng doanh thu hoạt động, sau đó nhân với 100 để biểu diễn nó dưới dạng phần trăm.\n -Một CTI thấp thường cho thấy hiệu suất vận hành hiệu quả, vì chi phí thấp so với doanh thu.",
    },
    equityOnLiability: {
        code: "Equity on Liability",
        name: "Equity on Liability",
        explain: "- Vốn chủ sở hữu trên Nghĩa vụ (EOL) là tỷ lệ giữa vốn chủ sở hữu và tổng nghĩa vụ của một tổ chức tài chính. Để tính EOL, ta chia vốn chủ sở hữu cho tổng nghĩa vụ, sau đó nhân với 100 để biểu diễn nó dưới dạng phần trăm.\n- Một EOL cao có thể cho thấy tỷ lệ lớn của vốn chủ sở hữu so với tổng nghĩa vụ, điều này có thể tăng cường sự tin tưởng từ cổ đông và nhà đầu tư.",
    },
    currentPayment: {
        code: "CP",
        name: "Current Payment",
        explain: "- Thanh toán hiện tại (CP) là tỷ lệ giữa số tiền thanh toán hiện tại và tổng nghĩa vụ của một tổ chức tài chính.\n- CP được tính bằng cách chia số tiền thanh toán hiện tại cho tổng nghĩa vụ, sau đó nhân với 100 để biểu diễn nó dưới dạng phần trăm.\n- Một CP thấp có thể là dấu hiệu của việc quản lý nợ hiệu quả và khả năng thanh toán nhanh chóng."
    },
    quickPayment: {
        code: "QP",
        name: "Quick Payment",
        explain: "- Thanh toán nhanh chóng (QP) là tỷ lệ giữa số tiền thanh toán nhanh chóng và tổng nghĩa vụ của một tổ chức tài chính.\n- QP được tính bằng cách chia số tiền thanh toán nhanh chóng cho tổng nghĩa vụ, sau đó nhân với 100 để biểu diễn nó dưới dạng phần trăm.\n- Một QP cao có thể là dấu hiệu của khả năng thanh toán nhanh chóng và hiệu suất tài chính tích cực.",
    },
    epsChange: {
        code: "Thay đổi EPS",
        name: "Earnings Per Share Change",
        explain: "- Sự thay đổi Earnings Per Share (EPS Change) là sự thay đổi phần trăm trong Earnings Per Share (EPS) so với kỳ trước đó.\n- EPS Change được tính bằng cách lấy sự khác biệt giữa EPS hiện tại và EPS trước đó, sau đó chia cho EPS trước đó và nhân với 100 để biểu diễn nó dưới dạng phần trăm.\n- Một EPS Change tích cực có thể là dấu hiệu của sự tăng trưởng lợi nhuận của doanh nghiệp.",
    },
    ebitdaOnStock: {
        code: "EBITDA trên cổ phiếu",
        name: "EBITDA on Stock",
        explain: "- EBITDA trên Cổ phiếu (EBITDA on Stock) là tỷ lệ giữa Lợi nhuận trước Lãi suất, Thuế, Khấu hao và Amortization (EBITDA) và số lượng cổ phiếu trên thị trường.\n -EBITDA on Stock được tính bằng cách chia EBITDA cho số lượng cổ phiếu và nhân với 100 để biểu diễn nó dưới dạng phần trăm.\n- Một EBITDA on Stock cao có thể là dấu hiệu của hiệu suất tài chính tích cực và giá trị cổ phiếu."
    },
    
    grossProfitMargin: {
        code: "GPM",
        name: "Gross Profit Margin",
        explain: "Biên Lợi Nhuận Gộp là một chỉ số tài chính thể hiện phần trăm doanh thu vượt qua chi phí hàng bán. Được tính bằng cách chia lợi nhuận gộp cho doanh thu và nhân với 100.",
    },
    operatingProfitMargin: {
        code: "OPM",
        name: "Operating Profit Margin",
        explain: "Biên Lợi Nhuận Hoạt Động đo lường phần trăm lợi nhuận mà một công ty kiếm được từ hoạt động kinh doanh sau khi trừ đi các chi phí hoạt động. Được tính bằng cách chia lợi nhuận hoạt động cho doanh thu và nhân với 100.",
    },
    postTaxMargin: {
        code: "PTM",
        name: "Post-Tax Margin",
        explain: "Post-Tax Margin, hay còn được gọi là Net Profit Margin, phản ánh phần trăm lợi nhuận còn lại sau khi đã trừ đi tất cả các loại thuế từ doanh thu. Được tính bằng cách chia lợi nhuận ròng sau thuế cho doanh thu và nhân với 100.",
    },
    debtOnEquity: {
        code: "DOE",
        name: "Debt on Equity",
        explain: "Debt on Equity đo lường tỷ lệ giữa nguồn vốn đến từ nợ so với vốn chủ sở hữu. Được tính bằng cách chia tổng nợ cho tổng vốn chủ sở hữu.",
    },    
    debtOnAsset: {
        code: "DOA",
        name: "Debt on Asset",
        explain: "Tỷ lệ Nợ trên Tổng Tài sản đo lường mức độ nợ so với toàn bộ tài sản của công ty. Được tính bằng cách chia tổng nợ cho tổng tài sản.",
    },
    debtOnEbitda: {
        code: "DOE",
        name: "Debt on EBITDA",
        explain: "Tỷ lệ Nợ trên EBITDA đo lường khả năng thanh toán nợ của công ty bằng lợi nhuận trước thuế, lãi và khấu hao. Được tính bằng cách chia tổng nợ cho EBITDA.",
    },
    shortOnLongDebt: {
        code: "SLD",
        name: "Short on Long Debt",
        explain: "Tỷ lệ Nợ Ngắn hạn so với Nợ Dài hạn thể hiện cân bằng giữa các khoản nợ ngắn hạn và dài hạn trong cấu trúc tài chính của công ty. Được tính bằng cách chia nợ ngắn hạn cho nợ dài hạn.",
    },
    assetOnEquity: {
        code: "AOE",
        name: "Asset on Equity",
        explain: "Tỷ lệ Tài sản trên Vốn Chủ sở hữu đo lường mức độ sử dụng tài sản so với vốn chủ sở hữu. Được tính bằng cách chia tổng tài sản cho tổng vốn chủ sở hữu.",
    },    
    capitalBalance: {
        code: "CB",
        name: "Capital Balance",
        explain: "Số Dư Vốn là một chỉ số tài chính thể hiện sự cân đối giữa tài sản và nghĩa vụ tài chính của công ty. Được tính bằng cách trừ tổng nghĩa vụ tài chính từ tổng tài sản.",
    },
    cashOnEquity: {
        code: "COE",
        name: "Cash on Equity",
        explain: "Tiền mặt trên Vốn Chủ sở hữu đo lường phần trăm tiền mặt mà công ty sở hữu so với vốn chủ sở hữu. Được tính bằng cách chia số tiền mặt cho tổng vốn chủ sở hữu.",
    },
    cashOnCapitalize: {
        code: "COC",
        name: "Cash on Capitalize",
        explain: "Tiền mặt trên Vốn hóa thị trường là một chỉ số thể hiện mức độ tiền mặt mà công ty sở hữu so với giá trị thị trường. Được tính bằng cách chia số tiền mặt cho giá trị vốn hóa thị trường.",
    },
    cashCirculation: {
        code: "CC",
        name: "Cash Circulation",
        explain: "Luồng Tiền Mặt thể hiện khả năng quản lý tiền mặt và tương đương tiền mặt của công ty trong quá trình kinh doanh. Được tính bằng cách chia lợi nhuận trước lãi và khấu hao cho tổng tài sản.",
    },
    revenueOnWorkCapital: {
        code: "ROWC",
        name: "Revenue on Working Capital",
        explain: "Doanh Thu trên Vốn Lưu Động đo lường khả năng sinh lời của công ty từ vốn lưu động. Được tính bằng cách chia doanh thu cho vốn lưu động.",
    },
    
    capexOnFixedAsset: {
        code: "CFA",
        name: "Chi phí đầu tư cố định",
        explain: "Số tiền công ty dùng để mua, bảo dưỡng, cải thiện tài sản cố định. Chỉ số này cho biết công ty đang đầu tư nhiều hay ít vào tài sản cố định."
    },
    revenueOnAsset: {
        code: "ROA",
        name: "Doanh thu trên tài sản",
        explain: "Chỉ số đánh giá hiệu quả sử dụng tài sản để tạo doanh thu. Chỉ số càng cao, hiệu quả sử dụng tài sản của công ty càng tốt."
    },
    postTaxOnPreTax: {
        code: "PTPT",
        name: "Thuế sau trên thuế trước",
        explain: "Số tiền thuế sau khi trừ các khoản thuế trước. Chỉ số này cho biết công ty đang chịu áp lực thuế như thế nào."
    },
    ebitOnRevenue: {
        code: "EOR",
        name: "Lợi nhuận trước thuế và lãi vay trên doanh thu",
        explain: "Tỷ lệ phần trăm lợi nhuận trước thuế và lãi vay so với doanh thu. Chỉ số này cho biết công ty có khả năng sinh lời như thế nào từ doanh thu."
    },
    preTaxOnEbit: {
        code: "PTE",
        name: "Thuế trước trên lợi nhuận trước thuế và lãi vay",
        explain: "Số tiền thuế trước khi trừ lợi nhuận trước thuế và lãi vay. Chỉ số này cho biết công ty đang chịu áp lực thuế như thế nào trên lợi nhuận."
    },
    preProvisionOnToi: {
        code: "PPT",
        name: "Dự phòng trước trên tổng thu nhập",
        explain: "Số tiền dự phòng trước khi tính tổng thu nhập. Chỉ số này cho biết công ty đã chuẩn bị dự phòng như thế nào cho rủi ro tài chính."
    },
    postTaxOnToi: {
        code: "PTT",
        name: "Thuế sau trên tổng thu nhập",
        explain: "Số tiền thuế sau khi tính tổng thu nhập. Chỉ số này cho biết công ty đang chịu áp lực thuế như thế nào sau khi tính toán thu nhập."
    },
    loanOnEarnAsset: {
        code: "LEA",
        name: "Khoản vay trên tài sản kiếm được",
        explain: "Số tiền vay để đầu tư vào tài sản kiếm được. Chỉ số này cho biết công ty đang sử dụng đòn bẩy tài chính như thế nào."
    },
    
    loanOnAsset: {
        code: "LOA",
        name: "Khoản vay trên tài sản",
        explain: "Số tiền vay so với tổng tài sản. Chỉ số này cho biết công ty đang sử dụng đòn bẩy tài chính như thế nào. Nếu chỉ số này cao, có thể cho thấy công ty đang chịu rủi ro tài chính do vay quá nhiều."
    },
    loanOnDeposit: {
        code: "LOD",
        name: "Khoản vay trên tiền gửi",
        explain: "Số tiền vay so với tổng tiền gửi. Chỉ số này cho biết công ty đang sử dụng tiền gửi của khách hàng như thế nào để tài trợ cho hoạt động kinh doanh."
    },
    depositOnEarnAsset: {
        code: "DOEA",
        name: "Tiền gửi trên tài sản kiếm được",
        explain: "Số tiền gửi so với tài sản kiếm được. Chỉ số này cho biết công ty đang quản lý tiền gửi của khách hàng như thế nào để tạo ra lợi nhuận."
    },
    badDebtOnAsset: {
        code: "BDOA",
        name: "Nợ xấu trên tài sản",
        explain: "Số nợ xấu so với tổng tài sản. Chỉ số này cho biết công ty đang quản lý rủi ro tài chính như thế nào. Nếu chỉ số này cao, có thể cho thấy công ty đang chịu rủi ro tài chính do nợ xấu."
    },
    liquidityOnLiability: {
        code: "LOL",
        name: "Thanh khoản trên nợ phải trả",
        explain: "Số tiền thanh khoản so với tổng nợ phải trả. Chỉ số này cho biết công ty đang quản lý thanh khoản như thế nào. Nếu chỉ số này cao, có thể cho thấy công ty có khả năng thanh toán nợ tốt."
    },
    payableOnEquity: {
        code: "POE",
        name: "Nợ phải trả trên vốn chủ sở hữu",
        explain: "Số nợ phải trả so với vốn chủ sở hữu. Chỉ số này cho biết công ty đang quản lý nợ phải trả như thế nào. Nếu chỉ số này cao, có thể cho thấy công ty đang chịu áp lực tài chính do nợ phải trả."
    },
    cancelDebt: {
        code: "CD",
        name: "Hủy nợ",
        explain: "Số nợ được hủy. Chỉ số này cho biết công ty đã hủy bỏ bao nhiêu nợ. Nếu chỉ số này cao, có thể cho thấy công ty đã giảm bớt rủi ro tài chính."
    },
    ebitdaOnStockChange: {
        code: "EOSC",
        name: "EBITDA trên thay đổi cổ phiếu",
        explain: "EBITDA so với thay đổi giá trị cổ phiếu. Chỉ số này cho biết công ty đang quản lý lợi nhuận như thế nào. Nếu chỉ số này cao, có thể cho thấy công ty có khả năng sinh lời tốt."
    },
    bookValuePerShareChange: {
        code: "BVSC",
        name: "Thay đổi giá trị sổ sách trên cổ phiếu",
        explain: "Thay đổi giá trị sổ sách so với thay đổi giá trị cổ phiếu. Chỉ số này cho biết công ty đang quản lý giá trị sổ sách như thế nào. Nếu chỉ số này cao, có thể cho thấy công ty đang tăng giá trị cho cổ đông."
    },
    creditGrowth: {
        code: "CG",
        name: "Tăng trưởng tín dụng",
        explain: "Tốc độ tăng trưởng của tín dụng. Chỉ số này cho biết công ty đang tăng trưởng như thế nào trong việc cung cấp tín dụng. Nếu chỉ số này cao, có thể cho thấy công ty đang mở rộng hoạt động kinh doanh."
    },
}

/* 
Chỉ số Lợi Nhuận:

roe (Return on Equity)
roa (Return on Assets)
postTaxMargin

Chỉ số Giá Cổ Phiếu:

priceToEarning
priceToBook

Chỉ số Lưu Chuyển Tiền và Thanh Toán:

daysReceivable
daysInventory
daysPayable
currentPayment
quickPayment

Chỉ số Nợ và Vốn Chủ Sở Hữu:

debtOnEquity
debtOnAsset
equityOnTotalAsset
equityOnLoan
Chỉ số Lãi Suất và Chi Phí Tài Chính:

interestMargin
ebitOnInterest
costOfFinancing

Chỉ số Hiệu Quả Quản Lý Chi Phí:

costToIncome
nonInterestOnToi

Chỉ số Tính Thanh Khoản và Tình Hình Tài Chính Ngắn Hạn:

currentPayment
quickPayment

Chỉ số Tăng Trưởng và Biến Động:

epsChange
ebitdaOnStockChange
bookValuePerShareChange
creditGrowth

Chỉ số Quản Lý Nợ và Rủi Ro Nợ:

badDebtPercentage
provisionOnBadDebt
liquidityOnLiability

Chỉ số Tổng Hợp và Tính Toán:

earningPerShare
bookValuePerShare
cashOnEquity
cashOnCapitalize
revenueOnWorkCapital
revenueOnAsset
*/