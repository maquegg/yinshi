// 页面管理
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM已加载，初始化页面");
    
    // 初始化页面内容
    initMenuPage();
    initExercisePage();
    initSleepPage();
    initCalendarPage();
    
    // 等待所有页面初始化完成后设置导航
    setTimeout(function() {
        setupNavigation();
    }, 200);
});

// 设置导航功能
function setupNavigation() {
    console.log("设置导航功能");
    
    // 获取所有页面和导航链接
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav a');
    const quickLinks = document.querySelectorAll('.link-cards a');
    
    console.log("页面数量:", pages.length);
    console.log("导航链接数量:", navLinks.length);
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        const pageId = link.getAttribute('data-page');
        console.log("设置导航链接:", link.textContent, "目标页面:", pageId);
        
        link.onclick = function(e) {
            e.preventDefault();
            showPage(pageId);
            return false;
        };
    });
    
    // 快速链接点击事件
    quickLinks.forEach(link => {
        const pageId = link.getAttribute('data-page');
        link.onclick = function(e) {
            e.preventDefault();
            showPage(pageId);
            return false;
        };
    });
    
    // 显示页面函数
    function showPage(pageId) {
        console.log("显示页面:", pageId);
        
        // 移除所有活动状态
        navLinks.forEach(link => link.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // 显示目标页面
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // 激活对应导航
            const navLink = document.querySelector(`.nav a[data-page="${pageId}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
            
            console.log("页面已显示:", pageId);
        } else {
            console.error("找不到页面:", pageId);
        }
    }
    
    // 检查创建的页面
    const menuPage = document.getElementById('menu');
    const exercisePage = document.getElementById('exercise');
    const sleepPage = document.getElementById('sleep');
    console.log("菜单页面存在:", menuPage ? true : false);
    console.log("运动页面存在:", exercisePage ? true : false);
    console.log("睡眠页面存在:", sleepPage ? true : false);
}

// 菜单数据 - 六个月轮换计划
const menuData = {
    month1: {
        week1: generateMenuWeek('第一周', true),
        week2: generateMenuWeek('第二周'),
        week3: generateMenuWeek('第三周'),
        week4: generateMenuWeek('第四周')
    },
    month2: {
        week1: generateMenuWeek('第五周'),
        week2: generateMenuWeek('第六周'),
        week3: generateMenuWeek('第七周'),
        week4: generateMenuWeek('第八周')
    },
    month3: {
        week1: generateMenuWeek('第九周'),
        week2: generateMenuWeek('第十周'),
        week3: generateMenuWeek('第十一周'),
        week4: generateMenuWeek('第十二周')
    },
    month4: {
        week1: generateMenuWeek('第十三周'),
        week2: generateMenuWeek('第十四周'),
        week3: generateMenuWeek('第十五周'),
        week4: generateMenuWeek('第十六周')
    },
    month5: {
        week1: generateMenuWeek('第十七周'),
        week2: generateMenuWeek('第十八周'),
        week3: generateMenuWeek('第十九周'),
        week4: generateMenuWeek('第二十周')
    },
    month6: {
        week1: generateMenuWeek('第二十一周'),
        week2: generateMenuWeek('第二十二周'),
        week3: generateMenuWeek('第二十三周'),
        week4: generateMenuWeek('第二十四周')
    }
};

// 运动数据
const exerciseData = {
    month1: generateExerciseMonth('第一个月'),
    month2: generateExerciseMonth('第二个月'),
    month3: generateExerciseMonth('第三个月'),
    month4: generateExerciseMonth('第四个月'),
    month5: generateExerciseMonth('第五个月'),
    month6: generateExerciseMonth('第六个月')
};

// 睡眠数据
const sleepData = {
    month1: generateSleepMonth('第一个月'),
    month2: generateSleepMonth('第二个月'),
    month3: generateSleepMonth('第三个月'),
    month4: generateSleepMonth('第四个月'),
    month5: generateSleepMonth('第五个月'),
    month6: generateSleepMonth('第六个月')
};

// 生成菜单周数据
function generateMenuWeek(weekName, isFirst = false) {
    // 基于每周主题的饮食安排，针对轻型地中海贫血特别设计
    let weekTheme = '';
    let focusIngredients = [];
    let newIngredients = [];
    let ironSources = [];
    
    // 根据周次设置不同的主题和重点食材
    if (weekName.includes('一') || isFirst) {
        weekTheme = '海鲜类为主';
        focusIngredients = ['鱼', '虾', '贝类'];
        newIngredients = ['秋刀鱼', '紫菜'];
        ironSources = ['紫菜', '黑木耳', '菠菜', '西兰花'];
    } else if (weekName.includes('二')) {
        weekTheme = '肉类为主';
        focusIngredients = ['瘦牛肉', '鸡肉', '兔肉'];
        newIngredients = ['兔肉', '莲藕'];
        ironSources = ['瘦牛肉', '鸡肝(少量)', '黑豆', '红薯叶'];
    } else if (weekName.includes('三')) {
        weekTheme = '豆制品和蛋类为主';
        focusIngredients = ['豆腐', '鸡蛋', '豆浆'];
        newIngredients = ['豆皮', '香菇'];
        ironSources = ['鸭蛋', '黄豆', '红豆', '黑芝麻'];
    } else if (weekName.includes('四')) {
        weekTheme = '谷物和蔬菜为主';
        focusIngredients = ['藜麦', '糙米', '深色蔬菜'];
        newIngredients = ['藜麦', '南瓜籽'];
        ironSources = ['燕麦', '南瓜籽', '枸杞', '羽衣甘蓝'];
    }
    
    // 基于轻型地中海贫血特别设计的饮食方案，注意避免过度补铁
    const baseDailyMenu = {
        monday: {
            breakfast: isFirst ? `全麦麦片150ml、水煮蛋1个、蓝莓少量、强化${focusIngredients[0]}钙奶200ml` : `燕麦粥150ml、水煮蛋1个、草莓少量、${focusIngredients[0]}钙奶200ml`,
            morningSnack: `切片橙子半个、原味酸奶100g(配少量${newIngredients[0]})`,
            lunch: `糙米饭100g、${focusIngredients[0] === '鱼' ? '蒸鲈鱼' : '清蒸' + focusIngredients[0]}40g、${ironSources[0]}炒胡萝卜50g、紫菜豆腐汤1小碗`,
            afternoonSnack: `香蕉半根、全麦${newIngredients[1]}饼干2片`,
            dinner: `小米南瓜粥1小碗、${focusIngredients[1] === '虾' ? '清蒸虾仁' : '清蒸' + focusIngredients[1]}40g、西兰花炒鸡蛋50g、${ironSources[1]}豆腐汤1小碗`
        },
        tuesday: {
            breakfast: `全麦吐司1片、煮蛋1个、牛油果泥1/4个、${focusIngredients[0]}豆浆200ml`,
            morningSnack: `猕猴桃半个、无糖酪乳100ml(配${ironSources[2]}少量)`,
            lunch: `藜麦饭100g、${focusIngredients[1] === '鸡肉' ? '煎鸡胸肉' : '煎' + focusIngredients[1]}40g、芦笋炒胡萝卜50g、${newIngredients[0]}豆腐汤1小碗`,
            afternoonSnack: `蓝莓少量、小块${ironSources[3]}面包1片`,
            dinner: `山药小米粥1小碗、${focusIngredients[2] ? '红烧' + focusIngredients[2] : '红烧鱼肉'}40g、西兰花${weekName.includes('二') ? '炒肉丝' : '炒虾仁'}少量、番茄蛋汤1小碗`
        },
        wednesday: {
            breakfast: `小米粥1小碗、${focusIngredients[0]}蒸蛋羹1份、蒸${ironSources[0]}小朵少量、钙奶200ml`,
            morningSnack: `橙子半个、少量${newIngredients[1]}5颗`,
            lunch: `红薯糙米饭100g、${focusIngredients[1] === '兔肉' ? '炖兔肉' : '炖' + focusIngredients[1]}40g、${ironSources[1]}炒豆腐1份、黄豆芽汤1小碗`,
            afternoonSnack: `原味酸奶100g、${ironSources[3]}饼干2片`,
            dinner: `燕麦粥1小碗、${focusIngredients[2] ? '酱爆' + focusIngredients[2] : '酱爆鱼肉'}40g、炒青菜50g、${newIngredients[0]}豆腐汤1小碗`
        },
        thursday: {
            breakfast: `麦片粥1小碗、${focusIngredients[0]}松饼1个、蒸胡萝卜条50g、豆浆200ml`,
            morningSnack: `小块黄瓜少量、原味酸奶配${ironSources[2]}100g`,
            lunch: `糙米饭100g、${focusIngredients[1] === '鸡肉' ? '烤鸡肉' : '烤' + focusIngredients[1]}40g、芦笋炒${weekName.includes('一') ? '虾仁' : '蛋'}少量、${ironSources[0]}豆腐汤1小碗`,
            afternoonSnack: `苹果半个、小块${newIngredients[1]}饼干2片`,
            dinner: `杂粮粥1小碗、${focusIngredients[2] ? '清蒸' + focusIngredients[2] : '清蒸鱼肉'}40g、清炒${ironSources[3]}50g、紫菜蛋汤1小碗`
        },
        friday: {
            breakfast: `燕麦片粥1小碗、${focusIngredients[0]}蒸蛋羹1份、小胡萝卜1根、钙奶200ml`,
            morningSnack: `草莓少量、原味酸奶配${newIngredients[0]}100g`,
            lunch: `南瓜糙米饭100g、${focusIngredients[1] === '虾' ? '干煸虾' : '干煸' + focusIngredients[1]}40g、青豆炒${ironSources[0]}少量、紫菜蛋花汤1小碗`,
            afternoonSnack: `橙子半个、全麦${ironSources[3]}饼干2片`,
            dinner: `薏米粥1小碗、${focusIngredients[2] ? '香煎' + focusIngredients[2] : '香煎鱼肉'}40g、西兰花炒胡萝卜50g、${newIngredients[1]}豆腐汤1小碗`
        },
        saturday: {
            breakfast: `全麦面包1片、${focusIngredients[0]}蒸蛋羹1份、煮西兰花小份、钙奶200ml`,
            morningSnack: `小块苹果半个、少量${newIngredients[0]}干少量`,
            lunch: `藜麦饭100g、${focusIngredients[1] === '兔肉' ? '焖兔肉' : '焖' + focusIngredients[1]}40g、${ironSources[1]}炒蛋1份、紫菜汤1小碗`,
            afternoonSnack: `自制水果优格1小碗、小块${ironSources[2]}饼干2片`,
            dinner: `小米粥1小碗、${focusIngredients[2] ? focusIngredients[2] + '肉丸' : '鸡肉丸'}3个、清炒${ironSources[3]}50g、萝卜豆腐汤1小碗`
        },
        sunday: {
            breakfast: `全麦麦片1小碗、什锦${focusIngredients[0]}蒸蛋羹1份、小番茄3个、豆浆200ml`,
            morningSnack: `猕猴桃半个、酸奶配${newIngredients[1]}100g`,
            lunch: `糙米饭100g、${focusIngredients.join('和')}什锦小炒40g、什锦蔬菜(西兰花、胡萝卜、${ironSources[2]})50g、${ironSources[0]}汤1小碗`,
            afternoonSnack: `自制${newIngredients[0]}松饼1小块、温牛奶150ml`,
            dinner: `红薯小米粥1小碗、${focusIngredients[1] === '鸡肉' ? '清蒸鸡肉' : '清蒸' + focusIngredients[1]}40g、${ironSources[1]}炒豆腐50g、${ironSources[3]}豆腐汤1小碗`
        }
    };
    
    // 根据周次微调菜单，增加变化性和营养多样性
    if (weekName.includes('二')) {
        // 第二周：着重肉类，增加优质蛋白
        baseDailyMenu.monday.lunch = baseDailyMenu.monday.lunch.replace('糙米饭', '藜麦糙米饭');
        baseDailyMenu.wednesday.dinner = baseDailyMenu.wednesday.dinner.replace('燕麦粥', '芡实粥');
        baseDailyMenu.friday.breakfast = baseDailyMenu.friday.breakfast.replace('小胡萝卜', '西兰花小朵');
        baseDailyMenu.sunday.lunch = baseDailyMenu.sunday.lunch.replace('什锦蔬菜', '芦笋菠菜什锦');
    } else if (weekName.includes('三')) {
        // 第三周：着重豆制品和蛋类
        baseDailyMenu.tuesday.breakfast = baseDailyMenu.tuesday.breakfast.replace('全麦吐司', '全麦豆皮卷');
        baseDailyMenu.tuesday.lunch = baseDailyMenu.tuesday.lunch.replace('煎', '香煎豆沙');
        baseDailyMenu.friday.dinner = baseDailyMenu.friday.dinner.replace('香煎', '蒸豆腐');
        baseDailyMenu.saturday.lunch = baseDailyMenu.saturday.lunch.replace('焖', '双色蛋');
    } else if (weekName.includes('四')) {
        // 第四周：着重谷物和蔬菜
        baseDailyMenu.monday.morningSnack = '奇异果半个、原味酸奶100g(配燕麦)';
        baseDailyMenu.wednesday.dinner = baseDailyMenu.wednesday.dinner.replace('酱爆', '藜麦');
        baseDailyMenu.friday.afternoonSnack = '梨子半个、全麦饼干2片';
        baseDailyMenu.sunday.lunch = baseDailyMenu.sunday.lunch.replace(ironSources[0], '羽衣甘蓝');
    }
    
    return {
        name: weekName,
        theme: weekTheme,
        focusIngredients: focusIngredients.join('、'),
        newIngredients: newIngredients.join('、'),
        days: baseDailyMenu
    };
}

// 生成运动月数据
function generateExerciseMonth(monthName) {
    // 轻型地中海贫血儿童适合的运动计划，强调适度和休息
    const baseExerciseWeek = {
        monday: {
            morning: '温和阳光下散步15分钟、小球滚动游戏10分钟',
            afternoon: '骑三轮车10分钟、休息5分钟、简单伸展运动10分钟、休息5分钟、垒积木游戏20分钟'
        },
        tuesday: {
            morning: '轻度户外攀爬玩具设施10分钟、休息5分钟、玩沙子游戏15分钟',
            afternoon: '模仿动物走路游戏10分钟、休息5分钟、轻度摇晃游戏10分钟、玩泡泡游戏15分钟'
        },
        wednesday: {
            morning: '阳光下慢走8分钟、休息5分钟、简单舞蹈动作10分钟',
            afternoon: '轻度球类游戏10分钟、休息5分钟、身体伸展运动10分钟、休息5分钟、爬行游戏10分钟'
        },
        thursday: {
            morning: '拍球游戏10分钟、休息5分钟、沙袋平衡走8分钟',
            afternoon: '户外秋千活动15分钟、休息5分钟、简单瑜伽动作8分钟、气球游戏12分钟'
        },
        friday: {
            morning: '户外自由玩耍15分钟、休息5分钟、小球滚动游戏10分钟',
            afternoon: '轻度跳跃游戏8分钟、休息5分钟、简单伸展操8分钟、休息5分钟、追逐泡泡游戏10分钟'
        },
        saturday: {
            morning: '户外公园散步15分钟、休息5分钟、轻度秋千活动10分钟、捡树叶游戏15分钟',
            afternoon: '亲子轻柔瑜伽10分钟、休息5分钟、模仿动物走路10分钟、休息5分钟、搭积木15分钟'
        },
        sunday: {
            morning: '家庭亲子互动游戏20分钟、休息10分钟、骑三轮车10分钟',
            afternoon: '户外轻度水/沙活动15分钟、休息5分钟、抛接气球游戏10分钟、休息5分钟、手工创作活动20分钟'
        }
    };
    
    // 根据月份微调运动计划，但保持适度强度，避免过度疲劳
    const adjustedExerciseWeek = {...baseExerciseWeek};
    
    // 随着适应性增强，可以稍稍增加活动时间，但保持频繁休息
    if (monthName.includes('三') || monthName.includes('四')) {
        adjustedExerciseWeek.monday.morning = adjustedExerciseWeek.monday.morning.replace('15分钟', '18分钟');
        adjustedExerciseWeek.thursday.afternoon = adjustedExerciseWeek.thursday.afternoon.replace('15分钟', '18分钟');
    } else if (monthName.includes('五') || monthName.includes('六')) {
        adjustedExerciseWeek.wednesday.morning = adjustedExerciseWeek.wednesday.morning.replace('8分钟', '10分钟');
        adjustedExerciseWeek.friday.afternoon = adjustedExerciseWeek.friday.afternoon.replace('8分钟', '10分钟');
    }
    
    return {
        name: monthName,
        days: adjustedExerciseWeek
    };
}

// 生成睡眠月数据
function generateSleepMonth(monthName) {
    // 基本的睡眠计划保持不变，这对孩子的成长至关重要
    const sleepSchedule = {
        napTime: '13:00-14:30 (1.5小时)',
        eveningPrep: '20:00开始洗漱准备',
        bedtime: '20:30上床',
        nightSleep: '21:00-7:00 (10小时)'
    };
    
    return {
        name: monthName,
        schedule: sleepSchedule,
        tips: [
            '保持固定的睡眠时间，培养良好的生物钟',
            '创造安静、舒适、光线柔和的睡眠环境',
            '睡前应避免剧烈运动和兴奋性活动',
            '可以进行安静的活动如读故事、听轻柔音乐',
            '避免睡前饮用含糖饮料和食用刺激性食物',
            '确保孩子穿着舒适的睡衣，保持适宜的室温'
        ],
        benefits: [
            '促进生长激素分泌，对身高发育至关重要',
            '增强免疫系统功能，减少生病频率',
            '有助于情绪稳定和行为调节',
            '促进大脑发育和认知功能',
            '改善注意力和学习能力'
        ]
    };
}

// 初始化菜单页面
function initMenuPage() {
    // 创建菜单页面
    const menuPage = document.createElement('div');
    menuPage.className = 'page';
    menuPage.id = 'menu';
    
    // 添加页面标题和说明
    let menuHTML = `
        <h2>每月饮食计划（优化版）</h2>
        <p>基于轻型地中海贫血特点，为您的孩子定制了均衡多样的饮食计划，着重叶酸和维生素B族摄入，避免过度补铁，促进全面营养。</p>
        <div class="food-focus">
            <h3>饮食重点推荐</h3>
            <ul>
                <li><strong>富含叶酸的食物：</strong>深绿色蔬菜、豆类、水果、全谷物</li>
                <li><strong>维生素B族来源：</strong>全谷物、瘦肉、蛋类、坚果、豆类</li>
                <li><strong>优质蛋白质：</strong>鱼肉、瘦肉、蛋类、奶制品、豆制品</li>
                <li><strong>均衡铁摄入：</strong>适量植物性铁（如豆类、菠菜）和动物性铁（如瘦肉、少量动物肝脏）</li>
                <li><strong>促进铁吸收：</strong>富含维生素C的食物，如柑橘类、草莓、猕猴桃</li>
            </ul>
        </div>
        
        <div class="month-selector">
            <h3>选择月份查看详细计划</h3>
            <div class="selector-buttons">
                <button class="month-btn active" data-month="month1">第一个月</button>
                <button class="month-btn" data-month="month2">第二个月</button>
                <button class="month-btn" data-month="month3">第三个月</button>
                <button class="month-btn" data-month="month4">第四个月</button>
                <button class="month-btn" data-month="month5">第五个月</button>
                <button class="month-btn" data-month="month6">第六个月</button>
            </div>
        </div>
        
        <div class="week-selector">
            <h3>选择周次</h3>
            <div class="selector-buttons">
                <button class="week-btn active" data-week="week1">第一周</button>
                <button class="week-btn" data-week="week2">第二周</button>
                <button class="week-btn" data-week="week3">第三周</button>
                <button class="week-btn" data-week="week4">第四周</button>
            </div>
        </div>
        
        <div id="menu-content" class="menu-content">
            <!-- 这里将通过JavaScript动态加载菜单内容 -->
        </div>
    `;
    
    menuPage.innerHTML = menuHTML;
    document.getElementById('content').appendChild(menuPage);
    
    // 添加月份选择事件监听
    const monthButtons = menuPage.querySelectorAll('.month-btn');
    const weekButtons = menuPage.querySelectorAll('.week-btn');
    
    monthButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            monthButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateMenuContent();
        });
    });
    
    weekButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            weekButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateMenuContent();
        });
    });
    
    // 初始加载第一个月第一周的菜单
    updateMenuContent();
    
    function updateMenuContent() {
        const activeMonth = menuPage.querySelector('.month-btn.active').getAttribute('data-month');
        const activeWeek = menuPage.querySelector('.week-btn.active').getAttribute('data-week');
        const menuContent = document.getElementById('menu-content');
        
        const weekData = menuData[activeMonth][activeWeek];
        
        let tableHTML = `
            <h3>${weekData.name}饮食计划</h3>
            <div class="week-theme">
                <p><strong>本周主题：</strong>${weekData.theme}</p>
                <p><strong>重点食材：</strong>${weekData.focusIngredients}</p>
                <p><strong>新引入食材：</strong>${weekData.newIngredients}</p>
            </div>
            <table class="menu-table">
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>星期一</th>
                        <th>星期二</th>
                        <th>星期三</th>
                        <th>星期四</th>
                        <th>星期五</th>
                        <th>星期六</th>
                        <th>星期日</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>早餐</strong><br>7:00-7:30</td>
                        <td>${weekData.days.monday.breakfast}</td>
                        <td>${weekData.days.tuesday.breakfast}</td>
                        <td>${weekData.days.wednesday.breakfast}</td>
                        <td>${weekData.days.thursday.breakfast}</td>
                        <td>${weekData.days.friday.breakfast}</td>
                        <td>${weekData.days.saturday.breakfast}</td>
                        <td>${weekData.days.sunday.breakfast}</td>
                    </tr>
                    <tr>
                        <td><strong>上午点心</strong><br>10:00</td>
                        <td>${weekData.days.monday.morningSnack}</td>
                        <td>${weekData.days.tuesday.morningSnack}</td>
                        <td>${weekData.days.wednesday.morningSnack}</td>
                        <td>${weekData.days.thursday.morningSnack}</td>
                        <td>${weekData.days.friday.morningSnack}</td>
                        <td>${weekData.days.saturday.morningSnack}</td>
                        <td>${weekData.days.sunday.morningSnack}</td>
                    </tr>
                    <tr>
                        <td><strong>午餐</strong><br>12:00-12:30</td>
                        <td>${weekData.days.monday.lunch}</td>
                        <td>${weekData.days.tuesday.lunch}</td>
                        <td>${weekData.days.wednesday.lunch}</td>
                        <td>${weekData.days.thursday.lunch}</td>
                        <td>${weekData.days.friday.lunch}</td>
                        <td>${weekData.days.saturday.lunch}</td>
                        <td>${weekData.days.sunday.lunch}</td>
                    </tr>
                    <tr>
                        <td><strong>下午点心</strong><br>15:30</td>
                        <td>${weekData.days.monday.afternoonSnack}</td>
                        <td>${weekData.days.tuesday.afternoonSnack}</td>
                        <td>${weekData.days.wednesday.afternoonSnack}</td>
                        <td>${weekData.days.thursday.afternoonSnack}</td>
                        <td>${weekData.days.friday.afternoonSnack}</td>
                        <td>${weekData.days.saturday.afternoonSnack}</td>
                        <td>${weekData.days.sunday.afternoonSnack}</td>
                    </tr>
                    <tr>
                        <td><strong>晚餐</strong><br>18:00-18:30</td>
                        <td>${weekData.days.monday.dinner}</td>
                        <td>${weekData.days.tuesday.dinner}</td>
                        <td>${weekData.days.wednesday.dinner}</td>
                        <td>${weekData.days.thursday.dinner}</td>
                        <td>${weekData.days.friday.dinner}</td>
                        <td>${weekData.days.saturday.dinner}</td>
                        <td>${weekData.days.sunday.dinner}</td>
                    </tr>
                </tbody>
            </table>
            <div class="cooking-tips">
                <h3>烹饪小贴士</h3>
                <ul>
                    <li>搭配维生素C丰富的食物（如青椒、西红柿、柑橘类）来提高铁吸收率</li>
                    <li>尽量多样化烹饪方式，增加孩子对食物的兴趣</li>
                    <li>新引入食材可少量尝试，观察孩子接受度后再增加</li>
                    <li>避免过度调味，保持食材原有营养价值</li>
                    <li>餐后可提供适量水果，但避免立即饮用茶或咖啡类饮品（会影响铁吸收）</li>
                </ul>
            </div>
        `;
        
        menuContent.innerHTML = tableHTML;
    }
}

// 初始化运动页面
function initExercisePage() {
    // 创建运动页面
    const exercisePage = document.createElement('div');
    exercisePage.className = 'page';
    exercisePage.id = 'exercise';
    
    // 添加页面标题和说明
    let exerciseHTML = `
        <h2>运动计划</h2>
        <p>适当的体育活动对促进骨骼发育和身高增长至关重要。以下运动计划专为3-4岁儿童设计，促进全面发展。</p>
        
        <div class="exercise-focus">
            <h3>运动益处与注意事项</h3>
            <ul>
                <li><strong>促进骨骼发育：</strong>适量的负重和拉伸运动有助于骨骼生长</li>
                <li><strong>增强肌肉力量：</strong>通过玩耍自然增强肌肉力量和协调性</li>
                <li><strong>阳光暴露：</strong>户外活动有助于维生素D合成，促进钙吸收</li>
                <li><strong>全面发展：</strong>平衡粗大运动和精细运动的发展</li>
                <li><strong>注意事项：</strong>避免过度运动，观察孩子反应，保证安全</li>
            </ul>
        </div>
        
        <div class="month-selector">
            <h3>选择月份查看详细计划</h3>
            <div class="selector-buttons">
                <button class="month-btn active" data-month="month1">第一个月</button>
                <button class="month-btn" data-month="month2">第二个月</button>
                <button class="month-btn" data-month="month3">第三个月</button>
                <button class="month-btn" data-month="month4">第四个月</button>
                <button class="month-btn" data-month="month5">第五个月</button>
                <button class="month-btn" data-month="month6">第六个月</button>
            </div>
        </div>
        
        <div id="exercise-content" class="exercise-content">
            <!-- 这里将通过JavaScript动态加载运动内容 -->
        </div>
    `;
    
    exercisePage.innerHTML = exerciseHTML;
    document.getElementById('content').appendChild(exercisePage);
    
    // 添加月份选择事件监听
    const monthButtons = exercisePage.querySelectorAll('.month-btn');
    
    monthButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            monthButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateExerciseContent();
        });
    });
    
    // 初始加载第一个月的运动计划
    updateExerciseContent();
    
    function updateExerciseContent() {
        const activeMonth = exercisePage.querySelector('.month-btn.active').getAttribute('data-month');
        const exerciseContent = document.getElementById('exercise-content');
        
        const monthData = exerciseData[activeMonth];
        
        let tableHTML = `
            <h3>${monthData.name}运动计划</h3>
            <table class="menu-table">
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>星期一</th>
                        <th>星期二</th>
                        <th>星期三</th>
                        <th>星期四</th>
                        <th>星期五</th>
                        <th>星期六</th>
                        <th>星期日</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>上午</strong><br>9:00-10:00</td>
                        <td>${monthData.days.monday.morning}</td>
                        <td>${monthData.days.tuesday.morning}</td>
                        <td>${monthData.days.wednesday.morning}</td>
                        <td>${monthData.days.thursday.morning}</td>
                        <td>${monthData.days.friday.morning}</td>
                        <td>${monthData.days.saturday.morning}</td>
                        <td>${monthData.days.sunday.morning}</td>
                    </tr>
                    <tr>
                        <td><strong>下午</strong><br>16:00-17:00</td>
                        <td>${monthData.days.monday.afternoon}</td>
                        <td>${monthData.days.tuesday.afternoon}</td>
                        <td>${monthData.days.wednesday.afternoon}</td>
                        <td>${monthData.days.thursday.afternoon}</td>
                        <td>${monthData.days.friday.afternoon}</td>
                        <td>${monthData.days.saturday.afternoon}</td>
                        <td>${monthData.days.sunday.afternoon}</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        exerciseContent.innerHTML = tableHTML;
    }
}

// 初始化睡眠页面
function initSleepPage() {
    // 创建睡眠页面
    const sleepPage = document.createElement('div');
    sleepPage.className = 'page';
    sleepPage.id = 'sleep';
    
    // 添加页面标题和说明
    let sleepHTML = `
        <h2>睡眠安排</h2>
        <p>充足且高质量的睡眠对于轻型地中海贫血儿童尤为重要，可以减轻贫血症状，优化生长激素分泌，促进身高增长。</p>
        
        <div class="sleep-schedule">
            <h3>每日睡眠时间表（增强版）</h3>
            <table class="menu-table">
                <thead>
                    <tr>
                        <th>时段</th>
                        <th>时间</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>午睡</strong></td>
                        <td>13:00-14:30</td>
                        <td>1.5小时午休对地中海贫血儿童尤为重要，有助于恢复能量，减轻疲劳症状</td>
                    </tr>
                    <tr>
                        <td><strong>晚间准备</strong></td>
                        <td>19:30</td>
                        <td>提前开始洗漱、穿睡衣等睡前准备活动，保持安静平和的环境</td>
                    </tr>
                    <tr>
                        <td><strong>上床时间</strong></td>
                        <td>20:00</td>
                        <td>可以进行安静的活动，如听故事、轻柔音乐</td>
                    </tr>
                    <tr>
                        <td><strong>夜间睡眠</strong></td>
                        <td>20:30-7:00</td>
                        <td>保证10.5小时连续睡眠，时间比常规儿童略长，促进生长激素分泌和身体恢复</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="sleep-tips">
            <h3>地中海贫血儿童的睡眠环境与习惯建议</h3>
            <ul>
                <li><strong>创造优质睡眠环境：</strong>安静、黑暗、凉爽的环境，保持室内良好通风，有助于提高睡眠质量和氧气供应</li>
                <li><strong>增加床头高度：</strong>稍微抬高床头，可以改善呼吸和血液循环</li>
                <li><strong>固定睡眠时间：</strong>严格保持规律的睡眠时间表，包括周末，避免出现"社交时差"</li>
                <li><strong>延长总睡眠时间：</strong>相比同龄儿童，地中海贫血患者可能需要更长的睡眠时间来恢复体力</li>
                <li><strong>舒适睡衣与被褥：</strong>选择透气、舒适的棉质睡衣和适合季节的被褥</li>
                <li><strong>睡前补水：</strong>睡前适量饮水，但避免大量饮水导致夜间频繁如厕</li>
                <li><strong>避免饮食干扰：</strong>睡前2小时避免进食，特别是含糖和刺激性食物</li>
                <li><strong>限制电子设备：</strong>睡前1-2小时避免使用电子设备，蓝光可能影响褪黑激素分泌</li>
            </ul>
        </div>
        
        <div class="sleep-benefits">
            <h3>睡眠对地中海贫血儿童的特殊益处</h3>
            <ul>
                <li><strong>减轻贫血症状：</strong>充足睡眠可减轻疲劳、乏力等贫血症状，改善日间活力</li>
                <li><strong>促进造血功能：</strong>深度睡眠期间，身体会加强红血球生成，帮助减轻贫血症状</li>
                <li><strong>优化生长激素分泌：</strong>约80%的生长激素在深度睡眠阶段分泌，直接影响身高增长</li>
                <li><strong>增强免疫功能：</strong>高质量睡眠有助于增强免疫系统，减少感染风险（地中海贫血儿童更容易受到感染）</li>
                <li><strong>改善认知能力：</strong>充足睡眠可以改善注意力、记忆力和学习能力，这对于地中海贫血儿童尤为重要</li>
                <li><strong>情绪调节：</strong>良好的睡眠有助于情绪稳定，减少易怒和情绪波动</li>
            </ul>
        </div>
        
        <div class="sleep-tips">
            <h3>监测建议</h3>
            <ul>
                <li><strong>观察睡眠质量：</strong>注意孩子的睡眠姿势、是否有打鼾、睡眠中断等情况</li>
                <li><strong>关注疲劳指数：</strong>记录孩子醒来后的精神状态，如持续疲惫可能需要调整睡眠安排</li>
                <li><strong>定期评估：</strong>每月记录睡眠情况，与医生分享睡眠日志，作为整体治疗计划的一部分</li>
            </ul>
        </div>
    `;
    
    sleepPage.innerHTML = sleepHTML;
    document.getElementById('content').appendChild(sleepPage);
}

// 初始化日历页面
function initCalendarPage() {
    // 创建日历页面
    const calendarPage = document.createElement('div');
    calendarPage.className = 'page';
    calendarPage.id = 'calendar';
    
    // 添加页面标题和框架
    let calendarHTML = `
        <h2>每日安排日历</h2>
        <p>查看完整的每日饮食、运动和睡眠计划，帮助您轻松安排孩子的日常活动。</p>
        
        <div class="calendar-header">
            <h3 id="calendar-month">2023年4月</h3>
            <div class="calendar-nav">
                <button id="prev-month">&lt; 上个月</button>
                <button id="next-month">下个月 &gt;</button>
            </div>
        </div>
        
        <div id="calendar-grid" class="calendar-grid">
            <!-- 日历将通过JavaScript动态生成 -->
        </div>
    `;
    
    calendarPage.innerHTML = calendarHTML;
    document.getElementById('content').appendChild(calendarPage);
    
    // 日历当前显示月份
    let currentMonth = 0; // 从第一个月开始
    
    // 添加月份导航事件监听
    document.getElementById('prev-month').addEventListener('click', function() {
        if (currentMonth > 0) {
            currentMonth--;
            updateCalendar();
        }
    });
    
    document.getElementById('next-month').addEventListener('click', function() {
        if (currentMonth < 5) { // 最多6个月
            currentMonth++;
            updateCalendar();
        }
    });
    
    // 初始加载日历
    updateCalendar();
    
    function updateCalendar() {
        const monthNames = ['第一个月', '第二个月', '第三个月', '第四个月', '第五个月', '第六个月'];
        const calendarMonthTitle = document.getElementById('calendar-month');
        const calendarGrid = document.getElementById('calendar-grid');
        
        // 更新月份标题
        calendarMonthTitle.textContent = monthNames[currentMonth];
        
        // 清空日历网格
        calendarGrid.innerHTML = '';
        
        // 添加星期头
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        weekdays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // 添加日期单元格 (简化为每月28天，每周7天)
        for (let i = 1; i <= 28; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            if (i === 1 && currentMonth === 0) {
                dayCell.classList.add('today');
            }
            
            const dayOfWeek = (i - 1) % 7; // 0是周日，1是周一...
            const weekOfMonth = Math.floor((i - 1) / 7); // 第几周
            
            // 日期头部
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = i;
            dayCell.appendChild(dayHeader);
            
            // 日期内容
            const dayContent = document.createElement('div');
            dayContent.className = 'calendar-day-content';
            
            // 获取当前月的周次数据
            const monthData = `month${currentMonth + 1}`;
            const weekData = `week${weekOfMonth + 1}`;
            
            // 获取星期几的数据
            let dayData;
            switch (dayOfWeek) {
                case 1: dayData = 'monday'; break;
                case 2: dayData = 'tuesday'; break;
                case 3: dayData = 'wednesday'; break;
                case 4: dayData = 'thursday'; break;
                case 5: dayData = 'friday'; break;
                case 6: dayData = 'saturday'; break;
                case 0: dayData = 'sunday'; break;
            }
            
            // 添加饮食信息
            if (menuData[monthData] && menuData[monthData][weekData]) {
                const breakfast = document.createElement('div');
                breakfast.className = 'food-item';
                breakfast.textContent = '早餐: ' + menuData[monthData][weekData].days[dayData].breakfast.split('、')[0];
                dayContent.appendChild(breakfast);
                
                const lunch = document.createElement('div');
                lunch.className = 'food-item';
                lunch.textContent = '午餐: ' + menuData[monthData][weekData].days[dayData].lunch.split('、')[0];
                dayContent.appendChild(lunch);
            }
            
            // 添加运动信息
            if (exerciseData[monthData] && exerciseData[monthData].days[dayData]) {
                const exercise = document.createElement('div');
                exercise.className = 'exercise-item';
                exercise.textContent = '运动: ' + exerciseData[monthData].days[dayData].morning.split('、')[0];
                dayContent.appendChild(exercise);
            }
            
            // 添加睡眠信息
            const sleep = document.createElement('div');
            sleep.className = 'sleep-item';
            sleep.textContent = '睡眠: 21:00-7:00';
            dayContent.appendChild(sleep);
            
            dayCell.appendChild(dayContent);
            calendarGrid.appendChild(dayCell);
        }
    }
} 