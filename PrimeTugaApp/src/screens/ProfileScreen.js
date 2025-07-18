import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  Switch 
} from 'react-native';
import Header from '../components/common/Header';
import themes from '../styles/themes';
import { APP_CONFIG } from '../utils/constants';
import { clearCache } from '../services/scraper';

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [hdQuality, setHdQuality] = useState(true);

  const handleClearCache = () => {
    Alert.alert(
      'Limpar Cache',
      'Isso irá remover todos os dados em cache. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpar', 
          onPress: () => {
            clearCache();
            Alert.alert('Sucesso', 'Cache limpo com sucesso!');
          }
        }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'Sobre o PrimeTuga',
      `Versão: ${APP_CONFIG.version}\n\nUm aplicativo para assistir filmes e séries com conteúdo do PrimeTuga.\n\nDesenvolvido com React Native.`,
      [{ text: 'OK' }]
    );
  };

  const handleSupport = () => {
    Alert.alert(
      'Suporte',
      'Para suporte técnico, entre em contato através do email: suporte@primetuga.com',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      'Política de Privacidade',
      'Respeitamos sua privacidade. Não coletamos dados pessoais sem seu consentimento.',
      [{ text: 'OK' }]
    );
  };

  const renderSettingItem = ({ title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        )}
      </View>
      {rightComponent && (
        <View style={styles.settingRight}>
          {rightComponent}
        </View>
      )}
      {onPress && !rightComponent && (
        <Text style={styles.settingArrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  const renderSwitchItem = ({ title, subtitle, value, onValueChange }) => (
    renderSettingItem({
      title,
      subtitle,
      rightComponent: (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ 
            false: themes.colors.border, 
            true: themes.colors.primary 
          }}
          thumbColor={themes.colors.text}
        />
      )
    })
  );

  return (
    <View style={styles.container}>
      <Header title="Perfil" />
      
      <ScrollView style={styles.scrollView}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>Usuário PrimeTuga</Text>
          <Text style={styles.userEmail}>usuario@primetuga.com</Text>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          
          {renderSwitchItem({
            title: 'Notificações',
            subtitle: 'Receber notificações sobre novos conteúdos',
            value: notifications,
            onValueChange: setNotifications
          })}
          
          {renderSwitchItem({
            title: 'Download Automático',
            subtitle: 'Baixar automaticamente episódios de séries favoritas',
            value: autoDownload,
            onValueChange: setAutoDownload
          })}
          
          {renderSwitchItem({
            title: 'Qualidade HD',
            subtitle: 'Reproduzir sempre em alta qualidade (usa mais dados)',
            value: hdQuality,
            onValueChange: setHdQuality
          })}
        </View>

        {/* Storage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Armazenamento</Text>
          
          {renderSettingItem({
            title: 'Limpar Cache',
            subtitle: 'Remove dados temporários para liberar espaço',
            onPress: handleClearCache
          })}
          
          {renderSettingItem({
            title: 'Gerenciar Downloads',
            subtitle: 'Ver e gerenciar conteúdo baixado',
            onPress: () => navigation.navigate('Downloads')
          })}
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          
          {renderSettingItem({
            title: 'Histórico de Visualização',
            subtitle: 'Ver filmes e séries assistidos recentemente',
            onPress: () => Alert.alert('Em Breve', 'Funcionalidade em desenvolvimento')
          })}
          
          {renderSettingItem({
            title: 'Minha Lista',
            subtitle: 'Gerenciar lista de favoritos',
            onPress: () => Alert.alert('Em Breve', 'Funcionalidade em desenvolvimento')
          })}
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suporte</Text>
          
          {renderSettingItem({
            title: 'Central de Ajuda',
            subtitle: 'Perguntas frequentes e tutoriais',
            onPress: handleSupport
          })}
          
          {renderSettingItem({
            title: 'Reportar Problema',
            subtitle: 'Relatar bugs ou problemas técnicos',
            onPress: () => Alert.alert('Reportar', 'Funcionalidade em desenvolvimento')
          })}
          
          {renderSettingItem({
            title: 'Política de Privacidade',
            subtitle: 'Como tratamos seus dados',
            onPress: handlePrivacy
          })}
          
          {renderSettingItem({
            title: 'Sobre',
            subtitle: `Versão ${APP_CONFIG.version}`,
            onPress: handleAbout
          })}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>
            PrimeTuga v{APP_CONFIG.version}
          </Text>
          <Text style={styles.appInfoText}>
            Desenvolvido com ❤️ para os amantes de cinema
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: themes.spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: themes.colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: themes.spacing.medium,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    ...themes.typography.title,
    color: themes.colors.text,
    marginBottom: themes.spacing.xs,
  },
  userEmail: {
    ...themes.typography.body,
    color: themes.colors.textSecondary,
  },
  section: {
    marginTop: themes.spacing.large,
  },
  sectionTitle: {
    ...themes.typography.subheader,
    color: themes.colors.text,
    marginHorizontal: themes.spacing.medium,
    marginBottom: themes.spacing.medium,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: themes.spacing.medium,
    paddingVertical: themes.spacing.medium,
    backgroundColor: themes.colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: themes.colors.border,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...themes.typography.body,
    color: themes.colors.text,
    marginBottom: themes.spacing.xs,
  },
  settingSubtitle: {
    ...themes.typography.caption,
    color: themes.colors.textSecondary,
    lineHeight: 16,
  },
  settingRight: {
    marginLeft: themes.spacing.medium,
  },
  settingArrow: {
    ...themes.typography.title,
    color: themes.colors.textMuted,
    marginLeft: themes.spacing.medium,
  },
  appInfo: {
    alignItems: 'center',
    padding: themes.spacing.large,
    marginTop: themes.spacing.large,
  },
  appInfoText: {
    ...themes.typography.caption,
    color: themes.colors.textMuted,
    textAlign: 'center',
    marginBottom: themes.spacing.xs,
  },
});
