import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const menuItems = [
  {
    name: 'The Margherita',
    description: 'San Marzano tomato, fior di latte, basil',
    price: '$14',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Spicy Honey',
    description: 'Pepperoni, hot honey, chili, mozzarella',
    price: '$17',
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Garden Party',
    description: 'Roasted peppers, mushrooms, olives, herbs',
    price: '$16',
    image:
      'https://images.unsplash.com/photo-1593560708920-61dd98c8c4e0?auto=format&fit=crop&w=800&q=85',
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const isSmallPhone = width < 380;
  const isMobile = width < 760;
  const isWide = width >= 760;

  function orderNow(item = 'your favorite pizza') {
    setActiveItem(item);
    Alert.alert('Great choice!', `We'll get ${item.toLowerCase()} started right away.`);
  }

  return (
    <View style={styles.page}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.nav,
            isMobile && styles.navMobile,
            isSmallPhone && styles.navSmallPhone,
            isWide && styles.wideContent,
          ]}>
          <Text style={styles.logo}>Piazza<Text style={styles.logoAccent}>.</Text></Text>
          {!isMobile && (
            <View style={styles.navLinks}>
              <Text style={styles.navLink}>Menu</Text>
              <Text style={styles.navLink}>Our story</Text>
              <Text style={styles.navLink}>Locations</Text>
            </View>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Start an order"
            onPress={() => orderNow()}
            style={({ pressed }) => [styles.navButton, isSmallPhone && styles.navButtonSmallPhone, pressed && styles.pressed]}>
            <Text style={styles.navButtonText}>Order online</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.hero,
            isMobile && styles.heroMobile,
            isSmallPhone && styles.heroSmallPhone,
            isWide && styles.wideContent,
          ]}>
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>WOOD-FIRED • HANDMADE • ALWAYS FRESH</Text>
            <Text style={[styles.heroTitle, isSmallPhone && styles.heroTitleSmallPhone]}>
              Good pizza{'\n'}makes good{'\n'}<Text style={styles.heroAccent}>days.</Text>
            </Text>
            <Text style={styles.heroDescription}>
              Big flavor, simple ingredients, and a little bit of magic in every slice.
            </Text>
            <View style={styles.heroActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="View the menu"
                onPress={() => orderNow('a pizza from our menu')}
                style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
                <Text style={styles.primaryButtonText}>See the menu</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </Pressable>
              <Text style={styles.deliveryNote}>Delivery & pickup available</Text>
            </View>
          </View>
          <View style={[styles.heroImageWrap, isMobile && styles.heroImageWrapMobile]}>
            <Image
              accessibilityLabel="Fresh pizza with basil and chili"
              source={{
                uri: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=90',
              }}
              contentFit="cover"
              style={styles.heroImage}
            />
            <View style={styles.imageBadge}>
              <Text style={styles.badgeNumber}>480°</Text>
              <Text style={styles.badgeLabel}>oven hot</Text>
            </View>
          </View>
        </View>

        <View style={[styles.menuSection, isMobile && styles.menuSectionMobile, isWide && styles.wideContent]}>
          <View style={[styles.sectionHeader, isMobile && styles.sectionHeaderMobile]}>
            <View>
              <Text style={styles.sectionKicker}>A FEW FAVORITES</Text>
              <Text style={styles.sectionTitle}>Made to share.</Text>
            </View>
            <Text style={[styles.sectionDescription, isMobile && styles.sectionDescriptionMobile]}>
              Every pie starts with our slow-fermented dough.
            </Text>
          </View>
          <View style={[styles.menuGrid, isWide && styles.menuGridWide]}>
            {menuItems.map((item) => (
              <Pressable
                key={item.name}
                accessibilityRole="button"
                accessibilityLabel={`Order ${item.name}`}
                onPress={() => orderNow(item.name)}
                style={({ pressed }) => [styles.menuCard, pressed && styles.cardPressed]}>
                <Image source={{ uri: item.image }} contentFit="cover" style={styles.menuImage} />
                <View style={styles.menuCardBody}>
                  <View style={styles.menuCardTitleRow}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                  <Text style={styles.addText}>{activeItem === item.name ? 'Added ✓' : 'Add to order  +'}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.footerCta, isMobile && styles.footerCtaMobile, isWide && styles.wideContent]}>
          <Text style={styles.footerCtaTitle}>Meet you at the table?</Text>
          <Text style={styles.footerCtaText}>Come hungry. Leave happy.</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Find a Piazza location"
            onPress={() => orderNow('a table for tonight')}
            style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}>
            <Text style={styles.outlineButtonText}>Find a location  →</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fffaf2' },
  scrollContent: { paddingBottom: 48 },
  wideContent: { width: '100%', maxWidth: 1180, alignSelf: 'center' },
  nav: {
    minHeight: 88,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navMobile: { minHeight: 76, paddingHorizontal: 18 },
  navSmallPhone: { paddingHorizontal: 16 },
  logo: { color: '#1f251f', fontSize: 28, fontWeight: '800', letterSpacing: -1.5 },
  logoAccent: { color: '#ef5b35' },
  navLinks: { flexDirection: 'row', gap: 28 },
  navLink: { color: '#596056', fontSize: 14, fontWeight: '600' },
  navButton: { backgroundColor: '#1f251f', paddingHorizontal: 17, paddingVertical: 11, borderRadius: 24 },
  navButtonSmallPhone: { paddingHorizontal: 14, paddingVertical: 10 },
  navButtonText: { color: '#fffaf2', fontSize: 13, fontWeight: '700' },
  hero: { paddingHorizontal: 24, paddingTop: 38, paddingBottom: 88, flexDirection: 'row', gap: 36, alignItems: 'center' },
  heroMobile: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 56, flexDirection: 'column', alignItems: 'stretch', gap: 34 },
  heroSmallPhone: { paddingHorizontal: 16, paddingTop: 16, gap: 28 },
  heroCopy: { flex: 1, minWidth: 280 },
  kicker: { color: '#ef5b35', fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 18 },
  heroTitle: { color: '#1f251f', fontSize: 60, lineHeight: 61, fontWeight: '800', letterSpacing: -3 },
  heroTitleSmallPhone: { fontSize: 48, lineHeight: 49, letterSpacing: -2.5 },
  heroAccent: { color: '#ef5b35' },
  heroDescription: { color: '#687067', fontSize: 17, lineHeight: 26, maxWidth: 390, marginTop: 22 },
  heroActions: { marginTop: 30, flexDirection: 'row', alignItems: 'center', gap: 18, flexWrap: 'wrap' },
  primaryButton: { flexDirection: 'row', alignItems: 'center', gap: 18, backgroundColor: '#ef5b35', paddingHorizontal: 21, paddingVertical: 15, borderRadius: 28 },
  primaryButtonText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  buttonArrow: { color: '#fff', fontSize: 20, lineHeight: 16 },
  deliveryNote: { color: '#8a9088', fontSize: 12 },
  heroImageWrap: { flex: 1, maxWidth: 550, position: 'relative' },
  heroImageWrapMobile: { width: '100%', maxWidth: undefined, alignSelf: 'center' },
  heroImage: { width: '100%', aspectRatio: 1.05, borderRadius: 180, borderBottomRightRadius: 34 },
  imageBadge: { position: 'absolute', bottom: 22, left: 22, backgroundColor: '#f9c64d', width: 84, height: 84, borderRadius: 42, justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '-10deg' }] },
  badgeNumber: { color: '#1f251f', fontSize: 17, fontWeight: '900' },
  badgeLabel: { color: '#1f251f', fontSize: 10, fontWeight: '700' },
  menuSection: { backgroundColor: '#f3eee3', paddingHorizontal: 24, paddingTop: 62, paddingBottom: 72 },
  menuSectionMobile: { paddingHorizontal: 20, paddingTop: 46, paddingBottom: 54 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, gap: 24 },
  sectionHeaderMobile: { flexDirection: 'column', alignItems: 'flex-start', gap: 12, marginBottom: 22 },
  sectionKicker: { color: '#ef5b35', fontSize: 11, letterSpacing: 1.4, fontWeight: '800' },
  sectionTitle: { color: '#1f251f', fontSize: 34, fontWeight: '800', letterSpacing: -1.2, marginTop: 5 },
  sectionDescription: { color: '#687067', maxWidth: 260, fontSize: 13, lineHeight: 19 },
  sectionDescriptionMobile: { maxWidth: 310 },
  menuGrid: { gap: 18 },
  menuGridWide: { flexDirection: 'row' },
  menuCard: { flex: 1, backgroundColor: '#fffaf2', borderRadius: 18, overflow: 'hidden' },
  cardPressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  menuImage: { width: '100%', aspectRatio: 1.25 },
  menuCardBody: { padding: 18 },
  menuCardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  menuName: { color: '#1f251f', fontSize: 18, fontWeight: '800' },
  price: { color: '#ef5b35', fontSize: 17, fontWeight: '800' },
  menuDescription: { color: '#777d74', fontSize: 13, lineHeight: 19, marginTop: 8, minHeight: 38 },
  addText: { color: '#1f251f', fontSize: 12, fontWeight: '800', marginTop: 17 },
  footerCta: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 74 },
  footerCtaMobile: { paddingHorizontal: 20, paddingVertical: 56 },
  footerCtaTitle: { color: '#1f251f', fontSize: 34, fontWeight: '800', letterSpacing: -1 },
  footerCtaText: { color: '#687067', fontSize: 16, marginTop: 8 },
  outlineButton: { borderColor: '#1f251f', borderWidth: 1, borderRadius: 24, paddingHorizontal: 20, paddingVertical: 13, marginTop: 24 },
  outlineButtonText: { color: '#1f251f', fontWeight: '800', fontSize: 13 },
  pressed: { opacity: 0.7 },
});
