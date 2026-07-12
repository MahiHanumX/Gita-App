import { useRef, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DarkShell } from '../../components/DarkShell';
import { LightShell } from '../../components/LightShell';
import { CTA } from '../../components/CTA';
import { useTranslation, useLocale } from '../../i18n';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
    const t = useTranslation();
    const { language } = useLocale();
    const { resolvedMode, theme } = useTheme();
    const { width } = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const Shell = resolvedMode === 'light' ? LightShell : DarkShell;

    const slides = [
        {
            logo: require('../../../assets/welcome-logo.png'),
            title: {
                en: 'Ancient wisdom, held gently in your day.',
                hi: 'प्राचीन ज्ञान, आज के जीवन में।',
                mr: 'प्राचीन ज्ञान, तुमच्या आजच्या जीवनात.',
                gu: 'પ્રાચીન જ્ઞાન, તમારા આજના જીવનમાં.',
                ta: 'பண்டைய அறிவு, இன்றைய வாழ்வில்.',
                te: 'ప్రాచీన జ్ఞానం, మీ నేటి జీవితంలో.',
            }[language] || 'Ancient wisdom, held gently in your day.',
            subtitle: {
                en: 'Wisdom for everyday life.',
                hi: 'हर दिन के लिए कोमल मार्गदर्शन।',
                mr: 'दररोजच्या जीवनासाठी मार्गदर्शन.',
                gu: 'દરરોજના જીવન માટે માર્ગદર્શન.',
                ta: 'அன்றாட வாழ்க்கைக்கான அறிவு.',
                te: 'రోజువారీ జీవితానికి మార్గదర్శకత్వం.',
            }[language] || 'Wisdom for everyday life.',
        },
        {
            logo: require('../../../assets/habit-logo.png'),
            title: {
                en: 'Build a mindful habit, step by step.',
                hi: 'एक सजग आदत बनाएं, धीरे-धीरे।',
                mr: 'सजग सवय बनवा, हळूहळू.',
                gu: 'એક સજગ આદત બનાવો, ધીમે ધીમે.',
                ta: 'ஒரு விழிப்புணர்வு பழக்கத்தை உருவாக்குங்கள்.',
                te: 'ఒక మైండ్‌ఫుల్ అలవాటును అలవర్చుకోండి.',
            }[language] || 'Build a mindful habit, step by step.',
            subtitle: {
                en: 'Just 5 to 10 minutes a day is all it takes.',
                hi: 'बस दिन में ५ से १० मिनट ही काफी हैं।',
                mr: 'दिवसातून फक्त ५ ते १० मिनिटे पुरेशी आहेत.',
                gu: 'દિવસમાં ફક્ત ૫ થી ૧૦ મિનિટ જ પૂરતી છે.',
                ta: 'நாளைக்கு 5 முதல் 10 நிமிடங்கள் மட்டுமே போதுமானது.',
                te: 'రోజుకు కేవలం 5 నుండి 10 నిమిషాలు సరిపోతుంది.',
            }[language] || 'Just 5 to 10 minutes a day is all it takes.',
        },
        {
            logo: require('../../../assets/icon.png'),
            title: {
                en: 'Find clarity in action, peace in outcomes.',
                hi: 'कर्म में स्पष्टता, परिणाम में शांति।',
                mr: 'कर्मात स्पष्टता, फलात शांती.',
                gu: 'કર્મમાં સ્પષ્ટતા, પરિણામમાં શાંતિ.',
                ta: 'செயலில் தெளிவு, விளைவுகளில் அமைதி.',
                te: 'కర్మలో స్పష్టత, ఫలితంలో ప్రశాంతత.',
            }[language] || 'Find clarity in action, peace in outcomes.',
            subtitle: {
                en: 'Discover purpose through the Gita.',
                hi: 'गीता के माध्यम से उद्देश्य की खोज करें।',
                mr: 'गीतेच्या माध्यमातून जीवनाचा उद्देश शोधा.',
                gu: 'ગીતાના માધ્યમથી જીવનનો ઉદ્દેશ શોધો.',
                ta: 'கீதை மூலம் நோக்கத்தைக் கண்டறியுங்கள்.',
                te: 'గీత ద్వారా జీవిత పరమార్థాన్ని కనుగొనండి.',
            }[language] || 'Discover purpose through the Gita.',
        },
    ];

    const onScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        if (slideSize === 0) return;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        if (roundIndex !== activeIndex) {
            setActiveIndex(roundIndex);
        }
    };

    const handlePress = () => {
        if (activeIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
            setActiveIndex(activeIndex + 1);
        } else {
            navigation.navigate('Intention');
        }
    };

    return (
        <Shell>
            <View style={styles.skipRow}>
                <Pressable onPress={() => navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Main' }] })}>
                    <Text style={[styles.skip, { color: theme.textMuted }]}>{t.common.skip}</Text>
                </Pressable>
            </View>
            <View style={styles.carouselContainer}>
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ width: width, alignItems: 'center', paddingHorizontal: 32 }}>
                            <View style={styles.illustration}>
                                <Image source={item.logo} style={styles.logo} resizeMode="contain" />
                            </View>
                            <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
                            <Text style={[styles.subtitle, { color: theme.accent }]}>{item.subtitle}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.paginationRow}>
                <View style={styles.dots}>
                    {slides.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                { backgroundColor: theme.progressTrack },
                                i === activeIndex && [styles.dotActive, { backgroundColor: theme.progressFill }],
                            ]}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.footer}>
                <CTA
                    label={activeIndex === slides.length - 1 ? t.common.begin : t.common.continue}
                    subLabel={activeIndex === slides.length - 1 ? t.common.begin : t.common.continue}
                    onPress={handlePress}
                />
            </View>
        </Shell>
    );
}

const styles = StyleSheet.create({
    skipRow: {
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
    skip: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        padding: 8,
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    illustration: {
        width: 260,
        height: 260,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 280,
        height: 280,
        borderRadius: 50,
    },
    title: {
        marginTop: 38,
        fontFamily: 'PlayfairDisplay_500Medium_Italic',
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 36,
    },
    subtitle: {
        marginTop: 12,
        fontFamily: 'NotoSansDevanagari_400Regular',
        fontSize: 18,
        textAlign: 'center',
    },
    paginationRow: {
        alignItems: 'center',
        marginVertical: 24,
    },
    dots: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    dotActive: {
        width: 24,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
});
